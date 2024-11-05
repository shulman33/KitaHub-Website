import { PrismaClient, Assignment, Prisma } from "@prisma/client";
import { IAssignmentRepository } from "../interfaces/IAssignmentRepository";


export class AssignmentRepository implements IAssignmentRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getAssignmentById(id: string): Promise<Assignment | null> {
    try {
      return await this.prisma.assignment.findUnique({
        where: { id },
        include: { class: true, grades: true, resources: true },
      });
    } catch (error) {
      console.error("Error fetching assignment by ID:", error);
      throw new Error("Error fetching assignment by ID");
    }
  }

  async getAssignmentsByClassId(classId: string): Promise<Assignment[]> {
    try {
      return await this.prisma.assignment.findMany({
        where: { classId },
        include: { class: true, grades: true, resources: true },
      });
    } catch (error) {
      console.error("Error fetching assignments by class ID:", error);
      throw new Error("Error fetching assignments by class ID");
    }
  }

  async createAssignment(
    data: Prisma.AssignmentCreateInput
  ): Promise<Assignment> {
    try {
      return await this.prisma.assignment.create({
        data,
        include: { class: true, grades: true, resources: true },
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw new Error("Error creating assignment");
    }
  }

  async updateAssignment(
    id: string,
    data: Prisma.AssignmentUpdateInput
  ): Promise<Assignment> {
    try {
      return await this.prisma.assignment.update({
        where: { id },
        data,
        include: { class: true, grades: true, resources: true },
      });
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw new Error("Error updating assignment");
    }
  }

  async deleteAssignment(id: string): Promise<void> {
    try {
      await this.prisma.assignment.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting assignment:", error);
      throw new Error("Error deleting assignment");
    }
  }
}
