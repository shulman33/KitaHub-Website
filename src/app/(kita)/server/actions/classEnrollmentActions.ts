"use server";

import { ClassEnrollmentRepository } from "../../repositories/ClassEnrollmentRepository";
import { userHasRole, getServerSession } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const classEnrollmentRepo = new ClassEnrollmentRepository();

// Get enrollments by user ID (accessible to authenticated users)
export async function getEnrollmentsByUserId(userId: string) {
  try {
    const session = await getServerSession();
    return await classEnrollmentRepo.getEnrollmentsByUserId(userId);
  } catch (error) {
    console.error("Error fetching enrollments by user ID:", error);
    throw new Error("Could not fetch enrollments");
  }
}

// Get enrollments by class ID (accessible to authenticated users)
export async function getEnrollmentsByClassId(classId: string) {
  try {
    const session = await getServerSession();
    return await classEnrollmentRepo.getEnrollmentsByClassId(classId);
  } catch (error) {
    console.error("Error fetching enrollments by class ID:", error);
    throw new Error("Could not fetch enrollments");
  }
}

// Create a class enrollment (professor role required)
export async function createEnrollment(data: Prisma.ClassEnrollmentCreateInput) {
  try {
    await userHasRole("professor");
    return await classEnrollmentRepo.createEnrollment(data);
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw new Error("Could not create enrollment");
  }
}

// Update a class enrollment (professor role required)
export async function updateEnrollment(id: string, data: Prisma.ClassEnrollmentUpdateInput) {
  try {
    await userHasRole("professor");
    return await classEnrollmentRepo.updateEnrollment(id, data);
  } catch (error) {
    console.error("Error updating enrollment:", error);
    throw new Error("Could not update enrollment");
  }
}

// Delete a class enrollment (professor role required)
export async function deleteEnrollment(id: string) {
  try {
    await userHasRole("professor");
    await classEnrollmentRepo.deleteEnrollment(id);
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw new Error("Could not delete enrollment");
  }
}

