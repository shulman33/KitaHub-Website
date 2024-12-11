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

export async function getClassesByUserId(): Promise<ExtendedClass[]> {
  try {
    const result = await dbAuth(async (db) => {
      const { rows: check } = await db.execute(
        sql`SELECT u."id", u."auth0UserId" FROM "User" u WHERE u."auth0UserId" = auth.user_id();`
      );
      console.log("check", check);


      const { rows: enrollments } = await db.execute(sql`
        SELECT ce."id", ce."userId", ce."classId"
        FROM "ClassEnrollment" ce
        JOIN "User" u ON ce."userId" = u.id
        WHERE u."auth0UserId" = auth.user_id();
      `);
      console.log("User's enrollments:", enrollments);

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
            FROM "ClassEnrollment" ce
            JOIN "User" u ON ce."userId" = u.id
            WHERE ce."classId" = "Class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorLastName: sql`(
            SELECT u."lastName"
            FROM "ClassEnrollment" ce
            JOIN "User" u ON ce."userId" = u.id
            WHERE ce."classId" = "Class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorProfilePicture: sql`(
            SELECT u."profilePicture"
            FROM "ClassEnrollment" ce
            JOIN "User" u ON ce."userId" = u.id
            WHERE ce."classId" = "Class"."id" AND u."role" = 'PROFESSOR'
            LIMIT 1
          )`,
        })
        .from(classTable)
        .innerJoin(classEnrollment, eq(classTable.id, classEnrollment.classId));
      // No .where(...) clause needed, RLS will handle filtering

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
    console.error("Error fetching classes by user ID:", error);
    throw new Error("Failed to fetch classes.");
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
