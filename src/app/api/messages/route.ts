import { getUserByAuth0Id } from "@/app/(kita)/lib/db-queries";
import { db } from "@/app/db/drizzle";
import { classEnrollment, classTable, message, user } from "@/app/db/schema";
import { getSession } from "@auth0/nextjs-auth0";
import { desc, eq, and, or, ilike, sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @route GET /api/messages
 * @description Retrieves a list of messages, users and classes associated with the message with optional filtering
 *
 * @queryParams {
 *   @param {uuid} [classId] - Messages for a specific class
 *   @param {string} [search] - Search users by name or email
 *   @param {number} [page=1] - Page number for pagination
 *   @param {number} [limit=4] - Number of users per page
 *   @param {string} [order=desc] - Sort order (asc/desc)
 * }
 * 
 * @note Edit the query so it also returns the tags associated with the message
 * 
 * @returns {Object} Response object containing messages and pagination info
 *   @returns {Array} messages - Array of message objects with associated user and class info
 *     @returns {Object} message - Message details
 *     @returns {Object} user - Associated user details
 *     @returns {Object} classTable - Associated class details
 *   @returns {Object} pagination - Pagination information
 *     @returns {number} page - Current page number
 *     @returns {number} limit - Number of items per page
 * 
 * @throws {401} - If user is not authenticated
 * @throws {500} - If there's a server error during message retrieval
 * 
 * @requires {Authentication} - Requires valid Auth0 session
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // query is "classId" for /api/messages?classId=5d2c985b-1cfb-41d7-a464-1b99ad3726cd
  const query = searchParams.get("classId");

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const searchParam = searchParams.get("search");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 4;
  const offset = (page - 1) * limit;

  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
  }

  const { sub } = session.user;

  try {
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;

    const conditions = [eq(classEnrollment.userId, userId)];

    if (query) {
      conditions.push(eq(message.classId, query));
    }

    if (searchParam) {
      const searchCondition = or(
        ilike(message.content, `%${searchParam}%`),
        ilike(user.firstName, `%${searchParam}%`),
        ilike(classTable.className, `%${searchParam}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }


    const messages = await db
      .selectDistinctOn([message.id], {
        message: message,
        user: user,
        classTable: classTable,
      })
      .from(message)
      .innerJoin(user, eq(message.userId, userId))
      .innerJoin(classTable, eq(message.classId, classTable.id))
      .innerJoin(classEnrollment, eq(message.classId, classEnrollment.classId))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    console.log("messages /api/messages", messages);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
      },
    });
  } catch (error: Error | any) {
    console.error("Error in GET /api/messages", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @route POST /api/messages
 * @description Creates a new message and saves it to the database and sends the message to the pusher server and channel
 * @see {@link file:/src/app/(kita)/server/actions/messageActions.ts:341-353} should be able to re-use the same logic for pusher
 * 
 * @note Only a user that is enrolled in the class can create a message
 *  
 *
 * @throws {401} - If user is not authenticated
 * @throws {500} - If there's a server error during message creation
 * 
 * @requires {Authentication} - Requires valid Auth0 session
 */
export async function POST(request: NextRequest) {}
