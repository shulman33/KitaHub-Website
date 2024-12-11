"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  grade,
  InsertGrade,
  SelectGrade,
} from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function getGradeById(
  gradeId: string
): Promise<SelectGrade | null> {
  try {
    const result = await dbAuth(async (db) => {
      const grades = await db.select().from(grade).where(eq(grade.id, gradeId));

      return grades;
    });

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching grade by ID:", error);
    throw new Error("Could not fetch grade");
  }
}

export async function getGradesByAssignmentId(
  assignmentId: string
): Promise<SelectGrade[]> {
  try {
    const result = await dbAuth(async (db) => {
      const grades = await db
        .select()
        .from(grade)
        .where(eq(grade.assignmentId, assignmentId));

      return grades;
    });

    return result;
  } catch (error) {
    console.error("Error fetching grades by assignment ID:", error);
    throw new Error("Could not fetch grades");
  }
}

export async function getGradesByStudentId(studentId: string) {
  try {
    const result = await dbAuth(async (db) => {
      const grades = await db
        .select()
        .from(grade)
        .where(eq(grade.studentId, studentId));

      return grades;
    });

    return result;
  } catch (error) {
    console.error("Error fetching grades by student ID:", error);
    throw new Error("Could not fetch grades");
  }
}

export async function createGrade(data: InsertGrade): Promise<SelectGrade> {
  try {
    const result = await dbAuth(async (db) => {
      const newGrade = await db.insert(grade).values(data).returning();
      return newGrade[0];
    });
    return result;
  } catch (error) {
    console.error("Error creating grade:", error);
    throw new Error("Could not create grade");
  }
}

export async function updateGrade(id: string, data: InsertGrade): Promise<SelectGrade> {
  try {
    const result = await dbAuth(async (db) => {
      const updatedGrade = await db
        .update(grade)
        .set(data)
        .where(eq(grade.id, id))
        .returning();
      return updatedGrade[0];
    })
    return result;
  } catch (error) {
    console.error("Error updating grade:", error);
    throw new Error("Could not update grade");
  }
}

export async function deleteGrade(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      await db.delete(grade).where(eq(grade.id, id));
    });
  } catch (error) {
    console.error("Error deleting grade:", error);
    throw new Error("Could not delete grade");
  }
}
