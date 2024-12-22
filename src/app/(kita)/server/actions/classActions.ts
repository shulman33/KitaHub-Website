"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  classTable,
  user,
  InsertClass,
  SelectClass,
  classEnrollment,
  SelectUser,
} from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { ExtendedClass, ExtendedInstructor, ExtendedStudent } from "../../lib/types";
import {
  currentUserId,
  currentUserRole,
  isEnrolledInClass,
} from "../../lib/utils";

// This function fetches a class by its ID
// it should return all the fields from the class table
// and the professor's first name, last name, and profile picture
// it should only return the class if the current user is enrolled in it
export async function getClassById(id: string): Promise<ExtendedClass | null> {
  try {
    const result = await dbAuth(async (db) => {
      const classes = await db
        .select({
          id: classTable.id,
          universityId: classTable.universityId,
          className: classTable.className,
          description: classTable.description,
          code: classTable.code,
          semester: classTable.semester,
          year: classTable.year,
          isActive: classTable.isActive,
          professorFirstName: sql<string>`(
            SELECT u."firstName"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = ${id} AND ce."role" = 'PROFESSOR'
            LIMIT 1
          )`,
          professorLastName: sql<string>`(
            SELECT u."lastName"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = ${id} AND ce."role" = 'PROFESSOR'
            LIMIT 1
          )`,
          professorProfilePicture: sql<string | null>`(
            SELECT u."profilePicture"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = ${id} AND ce."role" = 'PROFESSOR'
            LIMIT 1
          )`,
        })
        .from(classTable)
        .where(
          sql`${classTable.id} = ${id} AND ${isEnrolledInClass(classTable.id)}`
        );

      if (!classes.length) return null;

      const cls = classes[0];
      return {
        ...cls,
        professorName: `${cls.professorFirstName} ${cls.professorLastName}`,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    throw new Error("Error fetching class by ID");
  }
}

// This function fetches classes for the current user
// it should return all the fields from the class table
// and the professor's first name, last name, and profile picture
// it should only return the class if the current user is enrolled in it
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
            WHERE ce."classId" = "class"."id" AND ce."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorLastName: sql`(
            SELECT u."lastName"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = "class"."id" AND ce."role" = 'PROFESSOR'
            LIMIT 1
          )`,

          professorProfilePicture: sql`(
            SELECT u."profilePicture"
            FROM "class_enrollment" ce
            JOIN "user" u ON ce."userId" = u.id
            WHERE ce."classId" = "class"."id" AND ce."role" = 'PROFESSOR'
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
        professorName: `${cls.professorFirstName} ${cls.professorLastName}`,
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


// this funnction fetches all instructors for a class
// it should return the first name, last name, email, and profile picture from user table and the class name from class table
// it should only return the instructors for a class if the current user is enrolled in it
export async function getInstructorsByClassId(
  classId: string
): Promise<ExtendedInstructor[]> {
  try {
    const result = await dbAuth(async (db) => {
      const instructors = await db
        .select({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePicture: user.profilePicture,
          className: classTable.className,
        })
        .from(classEnrollment)
        .innerJoin(user, eq(classEnrollment.userId, user.id))
        .innerJoin(classTable, eq(classEnrollment.classId, classTable.id))
        .where(
          sql`${classEnrollment.classId} = ${classId} 
              AND ${classEnrollment.role} = 'PROFESSOR'
              AND ${isEnrolledInClass(classTable.id)}`
        );

      return instructors;
    });

    return result;
  } catch (error) {
    console.error("Error fetching instructors for class:", error);
    throw new Error("Error fetching instructors for class");
  }
}


// this function fetches all students for a class
// it should return the first name, last name, email, and profile picture from user table
// it should only return the students for a class if the current user is enrolled in it
export async function getStudentsByClassId(
  classId: string
): Promise<ExtendedStudent[]> {
  try {
    const result = await dbAuth(async (db) => {
      const students = await db
        .select({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePicture: user.profilePicture,
        })
        .from(classEnrollment)
        .innerJoin(user, eq(classEnrollment.userId, user.id))
        .where(
          sql`${classEnrollment.classId} = ${classId} 
              AND ${classEnrollment.role} = 'STUDENT'
              AND ${isEnrolledInClass(classEnrollment.classId)}`
        );

      return students;
    });

    return result;
  } catch (error) {
    console.error("Error fetching students for class:", error);
    throw new Error("Error fetching students for class");
  }
}

// This function fetches all classes for a university
// it should return all the fields from the class table
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

// This function fetches all active classes
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

// This function creates a new class
// it should return the newly created class
// it should only allow professors to create classes
// it should then enroll the professor in the class as a professor
export async function createClass(data: InsertClass): Promise<SelectClass> {
  try {
    const result = await dbAuth(async (db) => {
      // Check if user is a professor
      const userRole = await db
        .select({ role: user.role })
        .from(user)
        .where(sql`${user.auth0UserId} = auth.user_id()`);

      if (!userRole.length || userRole[0].role !== "PROFESSOR") {
        throw new Error("Only professors can create classes");
      }

      // Create the class
      const [newClass] = await db.insert(classTable).values(data).returning();

      // Enroll the professor
      await db.insert(classEnrollment).values({
        userId: currentUserId,
        classId: newClass.id,
        role: "PROFESSOR",
      });

      return newClass;
    });

    return result;
  } catch (error) {
    console.error("Error creating class:", error);
    throw new Error("Error creating class");
  }
}

// This function updates a class by its ID
// it should return the updated class
// it should only allow professors who are enrolled in the class to update classes
export async function updateClass(
  id: string,
  data: Partial<InsertClass>
): Promise<SelectClass> {
  try {
    const result = await dbAuth(async (db) => {
      // Check if user is an enrolled professor
      const enrollment = await db.select().from(classEnrollment).where(sql`
          ${classEnrollment.classId} = ${id} AND 
          ${classEnrollment.userId} = ${currentUserId} AND 
          ${classEnrollment.role} = 'PROFESSOR'
        `);

      if (!enrollment.length) {
        throw new Error("Only enrolled professors can update classes");
      }

      const [updatedClass] = await db
        .update(classTable)
        .set(data)
        .where(eq(classTable.id, id))
        .returning();

      return updatedClass;
    });

    return result;
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Error updating class");
  }
}

// This function deletes a class by its ID
// it should only allow professors who are enrolled in the class to delete classes
export async function deleteClass(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      // Check if user is an enrolled professor
      const enrollment = await db.select().from(classEnrollment).where(sql`
          ${classEnrollment.classId} = ${id} AND 
          ${classEnrollment.userId} = ${currentUserId} AND 
          ${classEnrollment.role} = 'PROFESSOR'
        `);

      if (!enrollment.length) {
        throw new Error("Only enrolled professors can delete classes");
      }

      // Delete all related enrollments first
      await db.delete(classEnrollment).where(eq(classEnrollment.classId, id));

      // Then delete the class
      await db.delete(classTable).where(eq(classTable.id, id));
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Error deleting class");
  }
}
