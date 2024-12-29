"user server";

import { dbAuth } from "@/app/db/drizzle";
import {
  resource,
  InsertResource,
  SelectResource,
} from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function getResourcesByClassId(classId: string): Promise<SelectResource[]> {
  try {
    const result = await dbAuth(async (db) => {
      const resources = await db
        .select()
        .from(resource)
        .where(eq(resource.classId, classId));

      return resources;
    });
    return result;
  } catch (error) {
    console.error("Error fetching resources by class ID:", error);
    throw new Error("Could not fetch resources");
  }
}

export async function getResourceById(resourceId: string): Promise<SelectResource | null> {
  try {
    const result = await dbAuth(async (db) => {
      const resources = await db
        .select()
        .from(resource)
        .where(eq(resource.id, resourceId));

      return resources;
    });

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    throw new Error("Could not fetch resource");
  }
}

export async function getResourceByUserId(id: string): Promise<SelectResource[]> {
  const result = await dbAuth(async (db) => {
    const resources = await db
      .select()
      .from(resource)
      .where(eq(resource.userId, id));

    return resources;
  });
  return result;
}

export async function createResource(data: InsertResource): Promise<SelectResource> {
  try {
    const result = await dbAuth(async (db) => {
      const newResource = await db
        .insert(resource)
        .values(data)
        .returning();
      return newResource[0];
    })
    return result;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw new Error("Could not create resource");
  }
}

export async function updateResource(
  id: string,
  data: InsertResource
) {
  try {
    const result = await dbAuth(async (db) => {
      const updatedResource = await db
        .update(resource)
        .set(data)
        .where(eq(resource.id, id))
        .returning();
      return updatedResource[0];
    })
    return result;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw new Error("Could not update resource");
  }
}

export async function deleteResource(id: string): Promise<void> {
  try {
    await dbAuth(async (db) => {
      await db
        .delete(resource)
        .where(eq(resource.id, id));
    });
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw new Error("Could not delete resource");
  }
}
