import { Grade, Prisma } from "@prisma/client";

export interface IGradeRepository {
  getGradeById(id: string): Promise<Grade | null>;
  getGradesByAssignmentId(assignmentId: string): Promise<Grade[]>;
  getGradesByStudentId(studentId: string): Promise<Grade[]>;
  createGrade(data: Prisma.GradeCreateInput): Promise<Grade>;
  updateGrade(id: string, data: Prisma.GradeUpdateInput): Promise<Grade>;
  deleteGrade(id: string): Promise<void>;
}
