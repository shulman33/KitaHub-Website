"use server";

import { UserRepository } from "../../repositories/UserRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const userRepo = new UserRepository();

// Get a user by ID (accessible to authenticated users)
export async function getUserById(userId: string) {
  try {
    const session = await getServerSession();
    if (session.userId !== userId) {
      await userHasRole("professor");
    }
    return await userRepo.getUserById(userId);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user");
  }
}

// Get a user by email (accessible to authenticated users)
export async function getUserByEmail(email: string) {
  try {
    const session = await getServerSession();
    if (session.email !== email) {
      await userHasRole("professor");
    }
    return await userRepo.getUserByEmail(email);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user");
  }
}

// Create a user (accessible to authenticated users)
export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const session = await getServerSession();
    return await userRepo.createUser(data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

// Update a user (restricted to professor role or user themselves if specified)
export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    const session = await getServerSession();
    if (id !== session.userId) {
      await userHasRole("professor");
    }
    return await userRepo.updateUser(id, data);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}

// Delete a user (restricted to professor role or admins if specified)
export async function deleteUser(id: string) {
  try {
    const session = await getServerSession();
    if (id !== session.userId) {
      await userHasRole("professor");
    }
    await userRepo.deleteUser(id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
}