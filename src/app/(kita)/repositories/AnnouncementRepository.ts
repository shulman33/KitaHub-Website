import { PrismaClient, Announcement, Prisma } from "@prisma/client";
import { IAnnouncementRepository } from "../interfaces/IAnnouncementRepository";

export class AnnouncementRepository implements IAnnouncementRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }
  
  async getAnnouncementById(id: string): Promise<Announcement | null> {
    try {
      return await this.prisma.announcement.findUnique({
        where: { id },
        include: {
          class: true,
          user: true,
        },
      });
    } catch (error) {
      console.error("Error fetching announcement by ID:", error);
      throw new Error("Error fetching announcement by ID");
    }
  }

  async getAnnouncementsByClassId(classId: string): Promise<Announcement[]> {
    try {
      return await this.prisma.announcement.findMany({
        where: { classId },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error fetching announcements by class ID:", error);
      throw new Error("Error fetching announcements by class ID");
    }
  }

  async createAnnouncement(
    data: Prisma.AnnouncementCreateInput
  ): Promise<Announcement> {
    try {
      return await this.prisma.announcement.create({
        data,
        include: {
          class: true,
          user: true,
        },
      });
    } catch (error) {
      console.error("Error creating announcement:", error);
      throw new Error("Error creating announcement");
    }
  }

  async updateAnnouncement(
    id: string,
    data: Prisma.AnnouncementUpdateInput
  ): Promise<Announcement> {
    try {
      return await this.prisma.announcement.update({
        where: { id },
        data,
        include: {
          class: true,
          user: true,
        },
      });
    } catch (error) {
      console.error("Error updating announcement:", error);
      throw new Error("Error updating announcement");
    }
  }

  async deleteAnnouncement(id: string): Promise<void> {
    try {
      await this.prisma.announcement.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting announcement:", error);
      throw new Error("Error deleting announcement");
    }
  }
}
