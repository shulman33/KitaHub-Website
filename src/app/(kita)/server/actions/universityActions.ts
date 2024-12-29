"use server";

import { db } from "@/app/db/drizzle";
import { university, InsertUniversity, SelectUniversity } from "@/app/db/schema";
import { eq } from "drizzle-orm";


export async function getUniversityById(universityId: string): Promise<SelectUniversity | null> {
  try {
    const result = await db.selectDistinct().from(university).where(eq(university.id, universityId));
    return result[0];
  } catch (error) {
    console.error("Error fetching university by ID:", error);
    throw new Error("Could not fetch university");
  }
}

export async function getAllUniversities(): Promise<SelectUniversity[]> {
  try {
    return await db.select().from(university);
  } catch (error) {
    console.error("Error fetching all universities:", error);
    throw new Error("Could not fetch universities");
  }
}

export async function createUniversity(data: InsertUniversity): Promise<SelectUniversity> {
  try {
    const result = await db.insert(university).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Error creating university:", error);
    throw new Error("Could not create university");
  }
}

export async function getOrCreateUniversity(data: InsertUniversity): Promise<SelectUniversity> {
  try {
    const uniResult = await db.selectDistinct().from(university).where(eq(university.name, data.name));

    if (uniResult.length > 0) {
      return uniResult[0];
    } else {
      return await createUniversity(data);
    }
  } catch (error) {
    console.error("Error getting or creating university:", error);
    throw new Error("Could not get or create university");
  }
}

export async function updateUniversity(
  id: string,
  data: InsertUniversity
): Promise<SelectUniversity> {
  try {
    const result = await db.update(university).set(data).where(eq(university.id, id)).returning();
    return result[0];
  } catch (error) {
    console.error("Error updating university:", error);
    throw new Error("Could not update university");
  }
}

export async function deleteUniversity(id: string): Promise<void> {
  try {
    await db.delete(university).where(eq(university.id, id));
  } catch (error) {
    console.error("Error deleting university:", error);
    throw new Error("Could not delete university");
  }
}
