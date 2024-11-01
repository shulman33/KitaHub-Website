import { PrismaClient, University, Prisma } from "@prisma/client";
import { IUniversityRepository } from "../interfaces/IUniversityRepository";

const prisma = new PrismaClient();

export class UniversityRepository implements IUniversityRepository {
  async getUniversityById(id: string): Promise<University | null> {
    try {
      return await prisma.university.findUnique({
        where: { id },
        include: { classes: true, users: true },
      });
    } catch (error) {
      console.error("Error fetching university by ID:", error);
      throw new Error("Error fetching university by ID");
    }
  }

  async getAllUniversities(): Promise<University[]> {
    try {
      return await prisma.university.findMany({
        include: { classes: true, users: true },
      });
    } catch (error) {
      console.error("Error fetching all universities:", error);
      throw new Error("Error fetching all universities");
    }
  }

  async createUniversity(
    data: Prisma.UniversityCreateInput
  ): Promise<University> {
    try {
      return await prisma.university.create({
        data,
      });
    } catch (error) {
      console.error("Error creating university:", error);
      throw new Error("Error creating university");
    }
  }

  async updateUniversity(
    id: string,
    data: Prisma.UniversityUpdateInput
  ): Promise<University> {
    try {
      return await prisma.university.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error updating university:", error);
      throw new Error("Error updating university");
    }
  }

  async deleteUniversity(id: string): Promise<void> {
    try {
      await prisma.university.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting university:", error);
      throw new Error("Error deleting university");
    }
  }
}
