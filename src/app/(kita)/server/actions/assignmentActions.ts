"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  InsertAssignment,
  SelectAssignment,
  assignment,
  classEnrollment,
  classTable,
} from "@/app/db/schema";
import { eq, and } from "drizzle-orm";
import { ExtendedSelectAssignment, TimeUntilDeadline } from "../../lib/types";
import { isEnrolledInClass, currentUserId } from "../../lib/utils";
import { intervalToDuration, formatDuration } from "date-fns";

/**
 * Calculates the remaining time until a given deadline.
 *
 * @param {number | string | Date} deadlineTimestamp - The deadline represented as a timestamp, ISO string, or Date object.
 * @returns {string} - A formatted string indicating days, hours, and minutes remaining.
 */
function getTimeUntilDeadline(
  deadlineTimestamp: number | string | Date
): TimeUntilDeadline {
  const deadline = new Date(deadlineTimestamp);
  const now = new Date();

  if (deadline <= now) {
    0;
  }

  const duration = intervalToDuration({
    start: now,
    end: deadline,
  });

  const formatted = formatDuration(duration, {
    format: ["days", "hours", "minutes"],
    delimiter: ", ",
  });

  const formattedJson = {
    days: duration.days || 0,
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
  };

  console.log(formattedJson);

  return formattedJson;
}

// this function fetches all assignments for a given class
// it should return all the fields from the assignment table
// and the class name
// it should only return assignments for classes the current user is enrolled in
export async function getAssignmentsByClassId(
  classId: string
): Promise<ExtendedSelectAssignment[]> {
  try {
    const result = await dbAuth(async (db) => {
      const assignments = await db
        .select({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          classId: assignment.classId,
          totalPoints: assignment.totalPoints,
          isUploaded: assignment.isUploaded,
          url: assignment.url,
          isGraded: assignment.isGraded,
          isPublished: assignment.isPublished,

          className: classTable.className,
        })
        .from(assignment)
        .innerJoin(
          classEnrollment,
          eq(assignment.classId, classEnrollment.classId)
        )
        .innerJoin(classTable, eq(assignment.classId, classTable.id))
        .where(
          and(
            eq(classEnrollment.classId, classId),
            isEnrolledInClass(classEnrollment.userId)
          )
        );

      const extendedAssignments = assignments.map((assignment) => {
        const timeToDeadlineObject = getTimeUntilDeadline(assignment.dueDate);
        return {
          ...assignment,
          timeToDeadlineObject,
        };
      });

      return extendedAssignments;
    });
    return result;
  } catch (error) {
    console.error("Error fetching assignments by class ID:", error);
    throw new Error("Error fetching assignments by class ID");
  }
}

// this function fetches all assignments for the current user
// it should return all the fields from the assignment table
// and the class name
// it should only return assignments for classes the current user is enrolled in
export async function getCurrentUserAssignment(): Promise<ExtendedSelectAssignment[]> {
  try{
    const result = await dbAuth(async (db) => {
      const assignments = await db
        .select({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          classId: assignment.classId,
          totalPoints: assignment.totalPoints,
          isUploaded: assignment.isUploaded,
          url: assignment.url,
          isGraded: assignment.isGraded,
          isPublished: assignment.isPublished,
          className: classTable.className,
        })
        .from(assignment)
        .innerJoin(
          classEnrollment,
          eq(assignment.classId, classEnrollment.classId)
        )
        .innerJoin(classTable, eq(assignment.classId, classTable.id))
        .where(
          and(
            isEnrolledInClass(classEnrollment.classId),
            eq(classEnrollment.userId, currentUserId)
          )
        );

      const extendedAssignments = assignments.map((assignment) => {
        const timeToDeadlineObject = getTimeUntilDeadline(assignment.dueDate);
        return {
          ...assignment,
          timeToDeadlineObject,
        };
      });

      return extendedAssignments;
    });
    return result;
  }catch(error){
    console.error("Error fetching current user assignments:", error);
    throw new Error("Error fetching current user assignments");
  }
}

// this function fetches a single assignment by its ID
// it should return all the fields from the assignment table
// and the class name
// it should only return the assignment if the current user is enrolled in the class
export async function getAssignmentById(
  id: string
): Promise<ExtendedSelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      const assignments = await db
        .select({
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          classId: assignment.classId,
          totalPoints: assignment.totalPoints,
          isUploaded: assignment.isUploaded,
          url: assignment.url,
          isGraded: assignment.isGraded,
          isPublished: assignment.isPublished,
          className: classTable.className,
        })
        .from(assignment)
        .innerJoin(classTable, eq(assignment.classId, classTable.id))
        .where(
          and(eq(assignment.id, id), isEnrolledInClass(assignment.classId))
        );

      if (!assignments.length) {
        throw new Error("Assignment not found or not authorized");
      }

      const timeToDeadlineObject = getTimeUntilDeadline(assignments[0].dueDate);
      return {
        ...assignments[0],
        timeToDeadlineObject,
      };
    });
    return result;
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    throw new Error("Error fetching assignment by ID");
  }
}

// this function creates a new assignment
// it should return the newly created assignment
// it should only create the assignment if the current user is a professor for the class
export async function createAssignment(
  data: InsertAssignment
): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      // Check if user is a professor for this class
      const enrollment = await db
        .select()
        .from(classEnrollment)
        .where(
          and(
            eq(classEnrollment.classId, data.classId),
            eq(classEnrollment.userId, currentUserId),
            eq(classEnrollment.role, "PROFESSOR")
          )
        );

      if (!enrollment.length) {
        throw new Error(
          "Only professors can create assignments for their classes"
        );
      }

      const [newAssignment] = await db
        .insert(assignment)
        .values(data)
        .returning();

      return newAssignment;
    });
    return result;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Could not create assignment");
  }
}

// this function updates an assignment by its ID
// it should return the updated assignment
// it should only update the assignment if the current user is a professor for the class
export async function updateAssignment(
  id: string,
  data: Partial<InsertAssignment>
): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      // First get the assignment to check the classId
      const existingAssignment = await db
        .select()
        .from(assignment)
        .where(eq(assignment.id, id));

      if (!existingAssignment.length) {
        throw new Error("Assignment not found");
      }

      // Check if user is a professor for this class
      const enrollment = await db
        .select()
        .from(classEnrollment)
        .where(
          and(
            eq(classEnrollment.classId, existingAssignment[0].classId),
            eq(classEnrollment.userId, currentUserId),
            eq(classEnrollment.role, "PROFESSOR")
          )
        );

      if (!enrollment.length) {
        throw new Error(
          "Only professors can update assignments for their classes"
        );
      }

      const [updatedAssignment] = await db
        .update(assignment)
        .set(data)
        .where(eq(assignment.id, id))
        .returning();

      return updatedAssignment;
    });
    return result;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw new Error("Could not update assignment");
  }
}

// this function deletes an assignment by its ID
// it should only delete the assignment if the current user is a professor for the class
export async function deleteAssignment(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      // First get the assignment to check the classId
      const existingAssignment = await db
        .select()
        .from(assignment)
        .where(eq(assignment.id, id));

      if (!existingAssignment.length) {
        throw new Error("Assignment not found");
      }

      // Check if user is a professor for this class
      const enrollment = await db
        .select()
        .from(classEnrollment)
        .where(
          and(
            eq(classEnrollment.classId, existingAssignment[0].classId),
            eq(classEnrollment.userId, currentUserId),
            eq(classEnrollment.role, "PROFESSOR")
          )
        );

      if (!enrollment.length) {
        throw new Error(
          "Only professors can delete assignments for their classes"
        );
      }

      await db.delete(assignment).where(eq(assignment.id, id));
    });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw new Error("Could not delete assignment");
  }
}
