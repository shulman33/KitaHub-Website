import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";

import { user, classEnrollment } from "@/app/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const searchParams = request.nextUrl.searchParams;

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const searchParam = searchParams.get("search");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const offset = (page - 1) * limit;

  const classId = (await params).id;
  try {
    const conditions = [
      eq(classEnrollment.classId, classId),
      eq(user.role, "STUDENT"),
    ];

    if (searchParam) {
      const searchCondition = or(
        ilike(user.firstName, `%${searchParam}%`),
        ilike(user.lastName, `%${searchParam}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const students = await db
      .select({user: user})
      .from(user)
      .innerJoin(classEnrollment, eq(user.id, classEnrollment.userId))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(students);
  } catch (error: Error | any) {
    console.error("Error in GET /api/classes/:id/students", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
