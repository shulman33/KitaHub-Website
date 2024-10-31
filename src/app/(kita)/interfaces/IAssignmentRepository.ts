import { Assignment, Prisma } from "@prisma/client";

export interface IAssignmentRepository {
  getAssignmentById(id: string): Promise<Assignment | null>;
  getAssignmentsByClassId(classId: string): Promise<Assignment[]>;
  createAssignment(data: Prisma.AssignmentCreateInput): Promise<Assignment>;
  updateAssignment(
    id: string,
    data: Prisma.AssignmentUpdateInput
  ): Promise<Assignment>;
  deleteAssignment(id: string): Promise<void>;
}
