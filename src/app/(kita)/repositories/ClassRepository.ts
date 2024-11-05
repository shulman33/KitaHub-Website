import { PrismaClient, Class, Prisma } from "@prisma/client";
import { IClassRepository } from "../interfaces/IClassRepository";


export class ClassRepository implements IClassRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }
  async getClassById(id: string): Promise<Class | null> {
    try {
      return await this.prisma.class.findUnique({
        where: { id },
        include: {
          univserity: true,
          classEnrollments: true,
          assignments: true,
          resources: true,
          announcements: true,
          messages: true,
        },
      });
    } catch (error) {
      console.error("Error fetching class by ID:", error);
      throw new Error("Error fetching class by ID");
    }
  }

  async getClassesByUniversityId(universityId: string): Promise<Class[]> {
    try {
      return await this.prisma.class.findMany({
        where: { universityId },
        include: {
          univserity: true,
          classEnrollments: true,
        },
      });
    } catch (error) {
      console.error("Error fetching classes by university ID:", error);
      throw new Error("Error fetching classes by university ID");
    }
  }

  async getActiveClasses(): Promise<Class[]> {
    try {
      return await this.prisma.class.findMany({
        where: { isActive: true },
        include: {
          univserity: true,
        },
      });
    } catch (error) {
      console.error("Error fetching active classes:", error);
      throw new Error("Error fetching active classes");
    }
  }

  async createClass(data: Prisma.ClassCreateInput): Promise<Class> {
    try {
      return await this.prisma.class.create({
        data,
        include: {
          univserity: true,
        },
      });
    } catch (error) {
      console.error("Error creating class:", error);
      throw new Error("Error creating class");
    }
  }

  async updateClass(id: string, data: Prisma.ClassUpdateInput): Promise<Class> {
    try {
      return await this.prisma.class.update({
        where: { id },
        data,
        include: {
          univserity: true,
        },
      });
    } catch (error) {
      console.error("Error updating class:", error);
      throw new Error("Error updating class");
    }
  }

  async deleteClass(id: string): Promise<void> {
    try {
      await this.prisma.class.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting class:", error);
      throw new Error("Error deleting class");
    }
  }
}
