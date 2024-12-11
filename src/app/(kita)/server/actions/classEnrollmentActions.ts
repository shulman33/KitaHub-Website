"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  InsertClassEnrollment,
  SelectClassEnrollment,
  classEnrollment,
  classTable,
} from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function getEnrollmentsByUserId(userId: string): Promise<SelectClassEnrollment[]> {
  try {
    const result = await dbAuth(async (db) => {
      const enrollments = await db
        .select()
        .from(classEnrollment)
        .where(eq(classEnrollment.userId, userId));

      return enrollments;
    });
    return result;
  } catch (error) {
    console.error("Error fetching enrollments by user ID:", error);
    throw new Error("Could not fetch enrollments");
  }
}

export async function getEnrollmentsByClassId(classId: string): Promise<SelectClassEnrollment[]> {
  try {
    const result = await dbAuth(async (db) => {
      const enrollments = await db
        .select()
        .from(classEnrollment)
        .where(eq(classEnrollment.classId, classId));

      return enrollments;
    })
    return result;
  } catch (error) {
    console.error("Error fetching enrollments by class ID:", error);
    throw new Error("Could not fetch enrollments");
  }
}

export async function getEnrollmentByClassName(id: string, className: string) {
  try {
    const result = await dbAuth(async (db) => {
      const enrollment = await db
        .select()
        .from(classEnrollment)
        .innerJoin(classTable, eq(classEnrollment.classId, classTable.id))
        .where(
          and(
            eq(classTable.universityId, id),
            eq(classTable.className, className)
          )
        )
      return enrollment[0];
    })
    return result;
  } catch (error) {
    console.error("Error fetching enrollment by class name:", error);
    throw new Error("Could not fetch enrollment");
  }
}

export async function createEnrollment(data: InsertClassEnrollment): Promise<SelectClassEnrollment> {
  try {
    const result = await dbAuth(async (db) => {
      return await db.insert(classEnrollment).values(data).returning();
    })
    return result[0];
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw new Error("Could not create enrollment");
  }
}

export async function updateEnrollment(id: string, data: InsertClassEnrollment): Promise<SelectClassEnrollment> {
  try {
    const result = await dbAuth(async (db) => {
      return await db.update(classEnrollment).set(data).where(eq(classEnrollment.id, id)).returning();
    })
    return result[0];
  } catch (error) {
    console.error("Error updating enrollment:", error);
    throw new Error("Could not update enrollment");
  }
}

export async function deleteEnrollment(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      await db.delete(classEnrollment).where(eq(classEnrollment.id, id));
    })
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw new Error("Could not delete enrollment");
  }
}

