"use server";

import { GradeRepository } from "../../repositories/GradeRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const gradeRepo = new GradeRepository();

// Get a grade by ID (accessible to authenticated users)
export async function getGradeById(gradeId: string) {
  try {
    const session = await getServerSession();
    return await gradeRepo.getGradeById(gradeId);
  } catch (error) {
    console.error("Error fetching grade by ID:", error);
    throw new Error("Could not fetch grade");
  }
}

// Get grades by assignment ID (accessible to authenticated users)
export async function getGradesByAssignmentId(assignmentId: string) {
  try {
    await userHasRole("professor");
    return await gradeRepo.getGradesByAssignmentId(assignmentId);
  } catch (error) {
    console.error("Error fetching grades by assignment ID:", error);
    throw new Error("Could not fetch grades");
  }
}

// Get grades by student ID (accessible to authenticated users)
export async function getGradesByStudentId(studentId: string) {
  try {
    const session = await getServerSession();
    if (session.userId !== studentId) {
      throw new Error("You are not authorized to view these grades");
    }
    return await gradeRepo.getGradesByStudentId(studentId);
  } catch (error) {
    console.error("Error fetching grades by student ID:", error);
    throw new Error("Could not fetch grades");
  }
}

// Create a grade (professor role required)
export async function createGrade(data: Prisma.GradeCreateInput) {
  try {
    await userHasRole("professor");
    return await gradeRepo.createGrade(data);
  } catch (error) {
    console.error("Error creating grade:", error);
    throw new Error("Could not create grade");
  }
}

// Update a grade (professor role required)
export async function updateGrade(id: string, data: Prisma.GradeUpdateInput) {
  try {
    await userHasRole("professor");
    return await gradeRepo.updateGrade(id, data);
  } catch (error) {
    console.error("Error updating grade:", error);
    throw new Error("Could not update grade");
  }
}

// Delete a grade (professor role required)
export async function deleteGrade(id: string) {
  try {
    await userHasRole("professor");
    await gradeRepo.deleteGrade(id);
  } catch (error) {
    console.error("Error deleting grade:", error);
    throw new Error("Could not delete grade");
  }
}
