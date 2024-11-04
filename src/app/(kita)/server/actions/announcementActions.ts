"user server";

import { AnnouncementRepository } from "../../repositories/AnnouncementRepository";
import { getServerSession, userHasRole } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const announcementRepo = new AnnouncementRepository();

export async function getAnnouncementsByClassId(classId: string) {
  try {
    await getServerSession();

    return await announcementRepo.getAnnouncementsByClassId(classId);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Could not fetch announcements");
  }
}

export async function createAnnouncement(data: Prisma.AnnouncementCreateInput) {
  try {
    await userHasRole("professor");
    return await announcementRepo.createAnnouncement(data);
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw new Error("Could not create announcement");
  }
}

export async function updateAnnouncement(
  id: string,
  data: Prisma.AnnouncementUpdateInput
) {
  try {
    await userHasRole("professor");
    return await announcementRepo.updateAnnouncement(id, data);
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw new Error("Could not update announcement");
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await userHasRole("professor");
    await announcementRepo.deleteAnnouncement(id);
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw new Error("Could not delete announcement");
  }
}
