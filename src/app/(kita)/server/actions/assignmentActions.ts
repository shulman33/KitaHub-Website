"use server";

import { Prisma } from "@prisma/client";
import { AssignmentRepository } from "../../repositories/AssignmentRepository";
import { userHasRole, getServerSession } from "../../lib/auth";

const assignmentRepo = new AssignmentRepository();

// Get assignments by class ID (accessible to authenticated users)
export async function getAssignmentsByClassId(classId: string) {
  try {
    const session = await getServerSession();
    return await assignmentRepo.getAssignmentsByClassId(classId);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Could not fetch assignments");
  }
}

// Create an assignment (professor role required)
export async function createAssignment(data: Prisma.AssignmentCreateInput) {
  try {
    await userHasRole("professor");
    return await assignmentRepo.createAssignment(data);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Could not create assignment");
  }
}

// Update an assignment (professor role required)
export async function updateAssignment(id: string, data: Prisma.AssignmentUpdateInput) {
  try {
    await userHasRole("professor");
    return await assignmentRepo.updateAssignment(id, data);
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw new Error("Could not update assignment");
  }
}

// Delete an assignment (professor role required)
export async function deleteAssignment(id: string) {
  try {
    await userHasRole("professor");
    await assignmentRepo.deleteAssignment(id);
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw new Error("Could not delete assignment");
  }
}
