import { PrismaClient, University, Prisma } from "@prisma/client";
import { db } from "@/app/db/drizzle";
import {
  SelectUniversity,
  InsertUniversity,
  university,
} from "@/app/db/schema";
import { IUniversityRepository } from "../interfaces/IUniversityRepository";
import { eq } from "drizzle-orm";
import { config } from "dotenv";

config({ path: ".env.local" });

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

  async createUniversity(data: InsertUniversity): Promise<SelectUniversity> {
    try {
      const result = await db.insert(university).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating university:", error);
      throw new Error("Error creating university");
    }
  }

  async getOrCreateUniversity(
    data: InsertUniversity
  ): Promise<SelectUniversity> {
    try {
      const uniResult = await db
        .selectDistinct()
        .from(university)
        .where(eq(university.name, data.name));

      if (uniResult.length > 0) {
        return uniResult[0];
      } else {
        return await this.createUniversity(data);
      }
    } catch (error) {
      console.error("Error creating or fetching university:", error);
      throw new Error("Error creating or fetching university");
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
