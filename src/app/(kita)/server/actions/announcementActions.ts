"user server";

import { db } from "@/app/db/drizzle";
import {
  announcement,
  InsertAnnouncement,
  SelectAnnouncement,
} from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function getAnnouncementsByClassId(
  classId: string
): Promise<SelectAnnouncement[]> {
  try {
      const announcements = await db
        .select()
        .from(announcement)
        .where(eq(announcement.classId, classId));

      return announcements;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Could not fetch announcements");
  }
}

export async function getAnnouncementById(
  announcementId: string
): Promise<SelectAnnouncement | null> {
  try {
      const announcements = await db
        .select()
        .from(announcement)
        .where(eq(announcement.id, announcementId));

      return announcements[0] || null;
  } catch (error) {
    console.error("Error fetching announcement by ID:", error);
    throw new Error("Could not fetch announcement");
  }
}

export async function createAnnouncement(
  data: InsertAnnouncement
): Promise<SelectAnnouncement> {
  try {
      const newAnnouncement = await db
        .insert(announcement)
        .values(data)
        .returning();
      return newAnnouncement[0];
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw new Error("Could not create announcement");
  }
}

export async function updateAnnouncement(
  id: string,
  data: InsertAnnouncement
): Promise<SelectAnnouncement> {
  try {
      const updatedAnnouncement = await db
        .update(announcement)
        .set(data)
        .where(eq(announcement.id, id))
        .returning();
      return updatedAnnouncement[0];
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw new Error("Could not update announcement");
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  try {
      await db.delete(announcement).where(eq(announcement.id, id));
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw new Error("Could not delete announcement");
  }
}
