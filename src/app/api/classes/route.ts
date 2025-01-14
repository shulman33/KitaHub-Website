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
import { generateEnrollmentCode } from "@/app/(kita)/lib/utils";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { sub } = session.user;

  try {
    // Get the user ID from the database
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;

    const classes = await db
      .select({
        id: classTable.id,
        universityId: classTable.universityId,
        className: classTable.className,
        description: classTable.description,
        enrollmentCode: classTable.enrollmentCode,
        code: classTable.code,
        courseCode: classTable.courseCode,
        semester: classTable.semester,
        year: classTable.year,
        isActive: classTable.isActive,
        professorFirstName: user.firstName,
        professorLastName: user.lastName,
        professorProfilePicture: user.profilePicture,
      })
      .from(classTable)
      .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId))
      .leftJoin(
        user,
        and(eq(classEnrollment.userId, user.id), eq(user.role, "PROFESSOR"))
      )
      .where(eq(classEnrollment.userId, userId));

    return NextResponse.json(classes);
  } catch (error: Error | any) {
    console.error("Error in GET /api/classes", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { sub } = session.user;

  try {
    // Get the user ID from the database
    const currentUser = await getUserByAuth0Id(sub);
    const userId = currentUser.id;
    const userRole = currentUser.role;

    if (userRole !== "PROFESSOR") {
      return NextResponse.json(
        { error: "Only professors can create classes" },
        { status: 401 }
      );
    }

    const body = await req.json();
    if (!body.className || !body.courseCode || !body.year || !body.semester) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const enrollmentCode = generateEnrollmentCode();

    const newClass = await db.insert(classTable).values({
        className: body.className,
        description: body.description,
        courseCode: body.courseCode,
        semester: body.semester,
        year: body.year,
        universityId: currentUser.universityId,
        enrollmentCode,
        isActive: true,
    })
    .returning({
        classId: classTable.id,
    })

    await db.insert(classEnrollment).values({
        userId,
        classId: newClass[0].classId,
        role: "PROFESSOR",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/classes", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
