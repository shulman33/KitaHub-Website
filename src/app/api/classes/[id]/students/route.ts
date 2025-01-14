import { NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";

import { user, classEnrollment } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const classId = (await params).id;
  try {
    const students = await db
      .select()
      .from(user)
      .innerJoin(classEnrollment, eq(user.id, classEnrollment.userId))
      .where(and(eq(classEnrollment.classId, classId), eq(user.role, "STUDENT")))

    return NextResponse.json(students);
  } catch (error: Error | any) {
    console.error("Error in GET /api/classes/:id/students", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
