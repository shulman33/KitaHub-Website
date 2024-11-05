"use server";
import { UniversityRepository } from "../../repositories/UniversityRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const universityRepo = new UniversityRepository();

// Get a university by ID (accessible to authenticated users)
export async function getUniversityById(universityId: string) {
  try {
    const session = await getServerSession();
    return await universityRepo.getUniversityById(universityId);
  } catch (error) {
    console.error("Error fetching university by ID:", error);
    throw new Error("Could not fetch university");
  }
}

// Get all universities (accessible to authenticated users)
export async function getAllUniversities() {
  try {
    const session = await getServerSession();
    return await universityRepo.getAllUniversities();
  } catch (error) {
    console.error("Error fetching all universities:", error);
    throw new Error("Could not fetch universities");
  }
}

// Create a university (restricted to professor role or admins if specified)
export async function createUniversity(data: Prisma.UniversityCreateInput) {
  try {
    await userHasRole("professor");
    return await universityRepo.createUniversity(data);
  } catch (error) {
    console.error("Error creating university:", error);
    throw new Error("Could not create university");
  }
}

// Update a university (restricted to professor role or admins if specified)
export async function updateUniversity(
  id: string,
  data: Prisma.UniversityUpdateInput
) {
  try {
    await userHasRole("professor");
    return await universityRepo.updateUniversity(id, data);
  } catch (error) {
    console.error("Error updating university:", error);
    throw new Error("Could not update university");
  }
}

// Delete a university (restricted to professor role or admins if specified)
export async function deleteUniversity(id: string) {
  try {
    await userHasRole("professor");
    await universityRepo.deleteUniversity(id);
  } catch (error) {
    console.error("Error deleting university:", error);
    throw new Error("Could not delete university");
  }
}
