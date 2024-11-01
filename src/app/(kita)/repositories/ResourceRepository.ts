import { PrismaClient, Resource, Prisma } from "@prisma/client";
import { IResourceRepository } from "../interfaces/IResourceRepository";

export class ResourceRepository implements IResourceRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getResourceById(id: string): Promise<Resource | null> {
    try {
      return await this.prisma.resource.findUnique({
        where: { id },
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error fetching resource by ID:", error);
      throw new Error("Error fetching resource by ID");
    }
  }

  async getResourcesByClassId(classId: string): Promise<Resource[]> {
    try {
      return await this.prisma.resource.findMany({
        where: { classId },
        include: {
          assignment: true,
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error fetching resources by class ID:", error);
      throw new Error("Error fetching resources by class ID");
    }
  }

  async getResourcesByAssignmentId(assignmentId: string): Promise<Resource[]> {
    try {
      return await this.prisma.resource.findMany({
        where: { assignmentId },
        include: {
          class: true,
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error fetching resources by assignment ID:", error);
      throw new Error("Error fetching resources by assignment ID");
    }
  }

  async getResourcesByUserId(userId: string): Promise<Resource[]> {
    try {
      return await this.prisma.resource.findMany({
        where: { userId },
        include: {
          class: true,
          assignment: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error fetching resources by user ID:", error);
      throw new Error("Error fetching resources by user ID");
    }
  }

  async createResource(data: Prisma.ResourceCreateInput): Promise<Resource> {
    try {
      return await this.prisma.resource.create({
        data,
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error creating resource:", error);
      throw new Error("Error creating resource");
    }
  }

  async updateResource(
    id: string,
    data: Prisma.ResourceUpdateInput
  ): Promise<Resource> {
    try {
      return await this.prisma.resource.update({
        where: { id },
        data,
        include: {
          class: true,
          assignment: true,
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error updating resource:", error);
      throw new Error("Error updating resource");
    }
  }

  async deleteResource(id: string): Promise<void> {
    try {
      await this.prisma.resource.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw new Error("Error deleting resource");
    }
  }
}
