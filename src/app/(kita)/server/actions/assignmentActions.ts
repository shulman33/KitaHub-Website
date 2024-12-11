"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  InsertAssignment,
  SelectAssignment,
  assignment,
  classEnrollment,
} from "@/app/db/schema";
import { eq, and } from "drizzle-orm";

export async function getAssignmentsByClassId(classId: string): Promise<SelectAssignment[]> {
  try {
    const result = await dbAuth(async (db) => {
      const assignments = await db
        .select()
        .from(assignment)
        .where(eq(assignment.classId, classId));

      return assignments;
    })
    return result;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Could not fetch assignments");
  }
}

export async function getAllUserAssignments(id: string) {
  try {
    const result = await dbAuth(async (db) => {
      const assignments = await db
        .select()
        .from(assignment)
        .innerJoin(classEnrollment, eq(assignment.classId, classEnrollment.classId))
        .where(eq(classEnrollment.userId, id));

      return assignments;
    })
    return result;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Could not fetch assignments");
  }
} 

export async function createAssignment(data: InsertAssignment): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      const newAssignment = await db.insert(assignment).values(data).returning();
      return newAssignment[0];
    })
    return result;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Could not create assignment");
  }
}

export async function updateAssignment(id: string, data: InsertAssignment): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      const updatedAssignment = await db
        .update(assignment)
        .set(data)
        .where(eq(assignment.id, id))
        .returning();

      return updatedAssignment[0];
    })
    return result;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw new Error("Could not update assignment");
  }
}

export async function deleteAssignment(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      await db.delete(assignment).where(eq(assignment.id, id));
    })
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw new Error("Could not delete assignment");
  }
}
