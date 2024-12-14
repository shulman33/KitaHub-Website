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

// TODO: Implement the getAssignmentById function

export async function createAssignment(
  data: InsertAssignment
): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      const newAssignment = await db
        .insert(assignment)
        .values(data)
        .returning();
      return newAssignment[0];
    });
    return result;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Could not create assignment");
  }
}

export async function updateAssignment(
  id: string,
  data: InsertAssignment
): Promise<SelectAssignment> {
  try {
    const result = await dbAuth(async (db) => {
      const updatedAssignment = await db
        .update(assignment)
        .set(data)
        .where(eq(assignment.id, id))
        .returning();

      return updatedAssignment[0];
    });
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
    });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw new Error("Could not delete assignment");
  }
}
