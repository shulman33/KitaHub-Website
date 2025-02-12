import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { getUserByAuth0Id } from "@/app/(kita)/lib/db-queries";

import {
  classTable,
  user,
  classEnrollment,
} from "@/app/db/schema";
import { eq, and } from "drizzle-orm";
import { handleRouteError, validateAuthenticatedRequest } from "@/app/(kita)/lib/authUtils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await validateAuthenticatedRequest(req);
  if (auth instanceof NextResponse) return auth;

  const classId = (await params).id;

  try {
    const classes = await db
      .select({
        class: classTable,
        professorData: user,
      })
      .from(classTable)
      .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId))
      .leftJoin(
        user,
        and(eq(classEnrollment.userId, auth.userId), eq(user.role, "PROFESSOR"))
      )
      .where(
        and(eq(classEnrollment.userId, auth.userId), eq(classTable.id, classId))
      );

    console.log("classes in GET /api/classes", classes);

    return NextResponse.json(classes);
  } catch (error: Error | any) {
    handleRouteError(error, "GET /api/classes");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  const { sub } = session.user;
  const classId = (await params).id;

  try {
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;

    const body = await req.json();

    const updatedClass = await db
      .update(classTable)
      .set(body)
      .from(classTable)
      .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId))
      .leftJoin(user, eq(classEnrollment.userId, userId))
      .where(
        and(
          eq(classEnrollment.userId, userId),
          eq(classTable.id, classId),
          eq(user.role, "PROFESSOR")
        )
      )
      .returning({ updatedClass: classTable });

    return NextResponse.json(updatedClass);
  } catch (error: Error | any) {
    console.error("Error in PATCH /api/classes", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  const { sub } = session.user;
  const classId = (await params).id;

  try {
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;

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

    if (!enrollment.length) {
      return NextResponse.json({ error: "User is not authorized" }, { status: 401 });
    }

    await db
      .delete(classEnrollment)
      .where(eq(classEnrollment.classId, classId));

    const deletedClass = await db
      .delete(classTable)
      .where(eq(classTable.id, classId))
      .returning();

    return NextResponse.json(deletedClass);
  } catch (error: Error | any) {
    console.error("Error in DELETE /api/classes", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
