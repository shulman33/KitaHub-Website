import {
  handleRouteError,
  validateAuthenticatedRequest,
} from "@/app/(kita)/lib/authUtils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { eq, and } from "drizzle-orm";
import { id } from "date-fns/locale";
import { classEnrollment, classTable } from "@/app/db/schema";

export async function POST(
  { params }: { params: Promise<{ id: string }> },
  request: NextRequest
) {
  const auth = await validateAuthenticatedRequest(request);
  if (auth instanceof NextResponse) return auth;

  const classId = (await params).id;

  try {
    const body = await request.json();

    const [classDetails] = await db
      .select()
      .from(classTable)
      .where(eq(classTable.id, classId));

    console.log("classDetails in POST /api/classes/[id]", classDetails);

    if (!classDetails) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    if (classDetails.enrollmentCode !== body.enrollmentCode) {
      return NextResponse.json(
        { error: "Invalid enrollment code" },
        { status: 403 }
      );
    }

    if (!classDetails.isActive) {
      return NextResponse.json(
        { error: "Class is not active" },
        { status: 403 }
      );
    }

    const [existingEnrollment] = await db
      .select()
      .from(classEnrollment)
      .where(
        and(
          eq(classEnrollment.userId, auth.userId),
          eq(classEnrollment.classId, classId)
        )
      );

    console.log("existingEnrollment in POST /api/classes/[id]", existingEnrollment);

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "User is already enrolled in this class" },
        { status: 409 }
      );
    }

    const [enrollment] = await db
      .insert(classEnrollment)
      .values({
        userId: auth.userId,
        classId,
        role: "STUDENT",
      })
      .returning();

    console.log("enrollment in POST /api/classes/[id]", enrollment);

    return NextResponse.json(enrollment);
  } catch (error: Error | any) {
    handleRouteError(error, "POST /api/classes/[id]");
  }
}

export async function DELETE(
  { params }: { params: Promise<{ id: string }> },
  request: NextRequest
) {
  const auth = await validateAuthenticatedRequest(request);
  if (auth instanceof NextResponse) return auth;

  const classId = (await params).id;

  try {
    const [existingEnrollment] = await db
      .select()
      .from(classEnrollment)
      .where(
        and(
          eq(classEnrollment.userId, auth.userId),
          eq(classEnrollment.classId, classId)
        )
      );

    if (!existingEnrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    const [deleted] = await db
      .delete(classEnrollment)
      .where(
        and(
          eq(classEnrollment.userId, auth.userId),
          eq(classEnrollment.classId, classId)
        )
      )
      .returning();

    return NextResponse.json(deleted);
  } catch (error: Error | any) {
    return handleRouteError(error, "DELETE /api/classes/[id]");
  }
}
