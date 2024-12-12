"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  classTable,
  user,
  InsertClass,
  SelectClass,
  classEnrollment,
} from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { ExtendedClass } from "../../lib/types";
import { currentUserId, currentUserRole, isEnrolledInClass } from "../../lib/utils";

export async function getClassById(id: string): Promise<SelectClass | null> {
  try {
    const result = await dbAuth(async (db) => {
      const classes = await db
        .select()
        .from(classTable)
        .where(eq(classTable.id, id));

      return classes;
    });

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    throw new Error("Error fetching class by ID");
  }
}

export async function getClassesForCurrentUser(): Promise<ExtendedClass[]> {
  try {
    const result = await dbAuth(async (db) => {
      // Fetch classes where the current user is enrolled
      const classes = await db
        .select({
          // Selecting fields from the Class table
          id: classTable.id,
          universityId: classTable.universityId,
          className: classTable.className,
          description: classTable.description,
          code: classTable.code,
          semester: classTable.semester,
          year: classTable.year,
          isActive: classTable.isActive,

          // Selecting fields from the Professor's User table using subqueries
          professorFirstName: sql`(
            SELECT u."firstName"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = "class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorLastName: sql`(
            SELECT u."lastName"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = "class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorProfilePicture: sql`(
            SELECT u."profilePicture"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = "class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,
        })
        .from(classTable)
        .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId))
        // **Important:** Filter classes where the current user is enrolled
        .where(sql`class_enrollment."userId" = ${currentUserId}`);

      // Map the result to the ExtendedClass type
      const extendedClasses: ExtendedClass[] = classes.map((cls) => ({
        id: cls.id,
        universityId: cls.universityId,
        className: cls.className,
        description: cls.description,
        code: cls.code,
        semester: cls.semester,
        year: cls.year,
        isActive: cls.isActive,
        professorFirstName: cls.professorFirstName as string,
        professorLastName: cls.professorLastName as string,
        professorProfilePicture: cls.professorProfilePicture as string | null,
      }));

      console.log("extendedClasses", extendedClasses);
      return extendedClasses;
    });

    return result;
  } catch (error) {
    console.error("Error fetching classes for current user:", error);
    return [];
  }
}

export async function getClassesByUniversityId(
  universityId: string
): Promise<SelectClass[]> {
  try {
    const result = await dbAuth(async (db) => {
      const classes = await db
        .select()
        .from(classTable)
        .where(eq(classTable.universityId, universityId));

      return classes;
    });

    return result;
  } catch (error) {
    console.error("Error fetching classes by university ID:", error);
    throw new Error("Error fetching classes by university ID");
  }
}

export async function getActiveClasses(): Promise<SelectClass[]> {
  try {
    const result = await dbAuth(async (db) => {
      const classes = await db
        .select()
        .from(classTable)
        .where(eq(classTable.isActive, true));

      return classes;
    });

    return result;
  } catch (error) {
    console.error("Error fetching active classes:", error);
    throw new Error("Error fetching active classes");
  }
}

export async function createClass(data: InsertClass): Promise<SelectClass> {
  try {
    const result = await dbAuth(async (db) => {
      const newClass = await db.insert(classTable).values(data).returning();

      return newClass;
    });

    return result[0];
  } catch (error) {
    console.error("Error creating class:", error);
    throw new Error("Error creating class");
  }
}

export async function updateClass(
  id: string,
  data: Partial<InsertClass>
): Promise<SelectClass> {
  try {
    const result = await dbAuth(async (db) => {
      const updatedClass = await db
        .update(classTable)
        .set(data)
        .where(eq(classTable.id, id))
        .returning();

      return updatedClass;
    });

    return result[0];
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Error updating class");
  }
}

export async function deleteClass(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      await db.delete(classTable).where(eq(classTable.id, id));
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Error deleting class");
  }
}
