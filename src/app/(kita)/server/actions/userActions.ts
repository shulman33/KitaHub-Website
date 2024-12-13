"use server";

import { db } from "@/app/db/drizzle";
import { user, InsertUser, SelectUser } from "@/app/db/schema";
import { eq } from "drizzle-orm";


// Get a user by ID (accessible to authenticated users)
export async function getUserById(userId: string): Promise<SelectUser | null> {
  try {
    const result = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.id, userId));

    return result[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user");
  }
}

// Get a user by email (accessible to authenticated users)
export async function getUserByEmail(email: string): Promise<SelectUser | null> {
  try {
    const result = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.email, email));

    return result[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user");
  }
}

export async function getUserBySchoolEmail(schoolEmail: string): Promise<SelectUser | null> {
    const result = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.schoolEmail, schoolEmail));
    return result[0];
  }

  export async function getAllUsers(): Promise<SelectUser[]> {
    const result = await db.selectDistinct().from(user);
    return result;
  }

// Create a user (accessible to authenticated users)
export async function createUser(data: InsertUser): Promise<SelectUser> {
  try {
    const result = await db.insert(user).values(data).returning();
    // await redis.hset(`user:${result[0].id}`, JSON.stringify(result[0]));
    return result[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

// Update a user (restricted to professor role or user themselves if specified)
export async function updateUser(id: string, data: InsertUser): Promise<SelectUser> {
  try {
    const result = await db
      .update(user)
      .set(data)
      .where(eq(user.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}

// Delete a user (restricted to professor role or admins if specified)
export async function deleteUser(id: string) {
  try {
    await db.delete(user).where(eq(user.id, id));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
}