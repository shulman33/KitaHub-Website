// src/repositories/GradeRepository.ts
import { PrismaClient, Grade, Prisma } from "@prisma/client";
import { IGradeRepository } from "../interfaces/IGradeRepository";

export class GradeRepository implements IGradeRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getGradeById(id: string): Promise<Grade | null> {
    try {
      return await this.prisma.grade.findUnique({
        where: { id },
        include: {
          assignment: true,
          student: true,
        },
      });
    } catch (error) {
      console.error("Error fetching grade by ID:", error);
      throw new Error("Error fetching grade by ID");
    }
  }

  async getGradesByAssignmentId(assignmentId: string): Promise<Grade[]> {
    try {
      return await this.prisma.grade.findMany({
        where: { assignmentId },
        include: {
          student: true,
        },
      });
    } catch (error) {
      console.error("Error fetching grades by assignment ID:", error);
      throw new Error("Error fetching grades by assignment ID");
    }
  }

  async getGradesByStudentId(studentId: string): Promise<Grade[]> {
    try {
      return await this.prisma.grade.findMany({
        where: { studentId },
        include: {
          assignment: true,
        },
      });
    } catch (error) {
      console.error("Error fetching grades by student ID:", error);
      throw new Error("Error fetching grades by student ID");
    }
  }

  async createGrade(data: Prisma.GradeCreateInput): Promise<Grade> {
    try {
      return await this.prisma.grade.create({
        data,
        include: {
          assignment: true,
          student: true,
        },
      });
    } catch (error) {
      console.error("Error creating grade:", error);
      throw new Error("Error creating grade");
    }
  }

  async updateGrade(id: string, data: Prisma.GradeUpdateInput): Promise<Grade> {
    try {
      return await this.prisma.grade.update({
        where: { id },
        data,
        include: {
          assignment: true,
          student: true,
        },
      });
    } catch (error) {
      console.error("Error updating grade:", error);
      throw new Error("Error updating grade");
    }
  }

  async deleteGrade(id: string): Promise<void> {
    try {
      await this.prisma.grade.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting grade:", error);
      throw new Error("Error deleting grade");
    }
  }
}
