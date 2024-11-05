"use server";

import { ClassRepository } from "../../repositories/ClassRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const classRepo = new ClassRepository();

// Get a class by ID (accessible to authenticated users)
export async function getClassById(classId: string) {
  try {
    const session = await getServerSession();
    return await classRepo.getClassById(classId);
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    throw new Error("Could not fetch class");
  }
}

// Get all classes for a university (accessible to authenticated users)
export async function getClassesByUniversityId(universityId: string) {
  try {
    const session = await getServerSession();
    return await classRepo.getClassesByUniversityId(universityId);
  } catch (error) {
    console.error("Error fetching classes by university ID:", error);
    throw new Error("Could not fetch classes");
  }
}

// Get active classes (accessible to authenticated users)
export async function getActiveClasses() {
  try {
    const session = await getServerSession();
    return await classRepo.getActiveClasses();
  } catch (error) {
    console.error("Error fetching active classes:", error);
    throw new Error("Could not fetch active classes");
  }
}

// Create a class (professor role required)
export async function createClass(data: Prisma.ClassCreateInput) {
  try {
    await userHasRole("professor");
    return await classRepo.createClass(data);
  } catch (error) {
    console.error("Error creating class:", error);
    throw new Error("Could not create class");
  }
}

// Update a class (professor role required)
export async function updateClass(id: string, data: Prisma.ClassUpdateInput) {
  try {
    await userHasRole("professor");
    return await classRepo.updateClass(id, data);
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Could not update class");
  }
}

// Delete a class (professor role required)
export async function deleteClass(id: string) {
  try {
    await userHasRole("professor");
    await classRepo.deleteClass(id);
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Could not delete class");
  }
}
