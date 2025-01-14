import { db } from "@/app/db/drizzle";
import { eq } from "drizzle-orm";
import { university, user } from "@/app/db/schema";

/**
 * Find a user by their Auth0 user ID.
 * Returns `undefined` if no user is found.
 */
export async function getUserByAuth0Id(authUserId: string) {
  console.log("authUserId in db-queries", authUserId);
  const [theUser] = await db
    .select({ id: user.id, role: user.role, universityId: user.universityId })
    .from(user)
    .where(eq(user.auth0UserId, authUserId))
    .limit(1);

  console.log("theUser", theUser);

  return theUser;
}
