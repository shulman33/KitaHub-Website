import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { getUserByAuth0Id } from "@/app/(kita)/lib/db-queries";

import {
  classTable,
  user,
  InsertClass,
  SelectClass,
  classEnrollment,
  semesterEnum,
} from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { sub } = session.user;
  const classId = (await params).id;

  try {
    // Get the user ID from the database
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;

    const classes = await db
      .select({
        class: classTable,
        professorData: user,
      })
      .from(classTable)
      .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId))
      .leftJoin(
        user,
        and(eq(classEnrollment.userId, userId), eq(user.role, "PROFESSOR"))
      )
      .where(
        and(eq(classEnrollment.userId, userId), eq(classTable.id, classId))
      );

    return NextResponse.json(classes[0]);
  } catch (error: Error | any) {
    console.error("Error in GET /api/classes", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}
