"user server";

import { ResourceRepository } from "../../repositories/ResourceRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const resourceRepo = new ResourceRepository();

export async function getResourcesByClassId(classId: string) {
  try {
    await getServerSession();
    return await resourceRepo.getResourcesByClassId(classId);
  } catch (error) {
    console.error("Error fetching resources by class ID:", error);
    throw new Error("Could not fetch resources");
  }
}

export async function createResource(data: Prisma.ResourceCreateInput) {
  try {
    await userHasRole("professor");
    return await resourceRepo.createResource(data);
  } catch (error) {
    console.error("Error creating resource:", error);
    throw new Error("Could not create resource");
  }
}

export async function updateResource(
  id: string,
  data: Prisma.ResourceUpdateInput
) {
  try {
    await userHasRole("professor");
    return await resourceRepo.updateResource(id, data);
  } catch (error) {
    console.error("Error updating resource:", error);
    throw new Error("Could not update resource");
  }
}

export async function deleteResource(id: string) {
  try {
    await userHasRole("professor");
    await resourceRepo.deleteResource(id);
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw new Error("Could not delete resource");
  }
}
