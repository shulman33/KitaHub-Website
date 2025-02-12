import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { getUserByAuth0Id } from "@/app/(kita)/lib/db-queries";
import { db } from "@/app/db/drizzle";
import { classEnrollment } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";

export type AuthenticatedUser = {
  userId: string;
};

export async function validateAuthenticatedRequest(
  req: NextRequest
): Promise<AuthenticatedUser | NextResponse> {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  try {
    const currentUser = await getUserByAuth0Id(session.user.sub);
    return { userId: currentUser.id };
  } catch (error: any) {
    console.error("Error validating authenticated request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function validateProfessorAccess(
  userId: string,
  classId: string
): Promise<boolean> {
  const enrollment = await db
    .select()
    .from(classEnrollment)
    .where(
      and(
        eq(classEnrollment.classId, classId),
        eq(classEnrollment.userId, userId),
        eq(classEnrollment.role, "PROFESSOR")
      )
    );

  return enrollment.length > 0;
}

export function handleRouteError(error: any, route: string): NextResponse {
  console.error(`Error in ${route}:`, error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
