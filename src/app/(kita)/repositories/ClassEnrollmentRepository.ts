import { PrismaClient, ClassEnrollment, Prisma } from "@prisma/client";
import { IClassEnrollmentRepository } from "../interfaces/IClassEnrollmentRepository";

export class ClassEnrollmentRepository implements IClassEnrollmentRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getEnrollmentById(id: string): Promise<ClassEnrollment | null> {
    try {
      return await this.prisma.classEnrollment.findUnique({
        where: { id },
        include: {
          user: true,
          class: true,
        },
      });
    } catch (error) {
      console.error("Error fetching enrollment by ID:", error);
      throw new Error("Error fetching enrollment by ID");
    }
  }

  async getEnrollmentsByUserId(userId: string): Promise<ClassEnrollment[]> {
    try {
      return await this.prisma.classEnrollment.findMany({
        where: { userId },
        include: {
          class: true,
        },
      });
    } catch (error) {
      console.error("Error fetching enrollments by user ID:", error);
      throw new Error("Error fetching enrollments by user ID");
    }
  }

  async getEnrollmentsByClassId(classId: string): Promise<ClassEnrollment[]> {
    try {
      return await this.prisma.classEnrollment.findMany({
        where: { classId },
        include: {
          user: true,
        },
      });
    } catch (error) {
      console.error("Error fetching enrollments by class ID:", error);
      throw new Error("Error fetching enrollments by class ID");
    }
  }

  async createEnrollment(
    data: Prisma.ClassEnrollmentCreateInput
  ): Promise<ClassEnrollment> {
    try {
      return await this.prisma.classEnrollment.create({
        data,
        include: {
          user: true,
          class: true,
        },
      });
    } catch (error) {
      console.error("Error creating enrollment:", error);
      throw new Error("Error creating enrollment");
    }
  }

  async updateEnrollment(
    id: string,
    data: Prisma.ClassEnrollmentUpdateInput
  ): Promise<ClassEnrollment> {
    try {
      return await this.prisma.classEnrollment.update({
        where: { id },
        data,
        include: {
          user: true,
          class: true,
        },
      });
    } catch (error) {
      console.error("Error updating enrollment:", error);
      throw new Error("Error updating enrollment");
    }
  }

  async deleteEnrollment(id: string): Promise<void> {
    try {
      await this.prisma.classEnrollment.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      throw new Error("Error deleting enrollment");
    }
  }
}
