import { Announcement, Prisma } from "@prisma/client";

export interface IAnnouncementRepository {
  getAnnouncementById(id: string): Promise<Announcement | null>;
  getAnnouncementsByClassId(classId: string): Promise<Announcement[]>;
  createAnnouncement(
    data: Prisma.AnnouncementCreateInput
  ): Promise<Announcement>;
  updateAnnouncement(
    id: string,
    data: Prisma.AnnouncementUpdateInput
  ): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<void>;
}
