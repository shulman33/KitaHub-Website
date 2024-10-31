import { Resource, Prisma } from "@prisma/client";

export interface IResourceRepository {
  getResourceById(id: string): Promise<Resource | null>;
  getResourcesByClassId(classId: string): Promise<Resource[]>;
  getResourcesByAssignmentId(assignmentId: string): Promise<Resource[]>;
  getResourcesByUserId(userId: string): Promise<Resource[]>;
  createResource(data: Prisma.ResourceCreateInput): Promise<Resource>;
  updateResource(
    id: string,
    data: Prisma.ResourceUpdateInput
  ): Promise<Resource>;
  deleteResource(id: string): Promise<void>;
}
