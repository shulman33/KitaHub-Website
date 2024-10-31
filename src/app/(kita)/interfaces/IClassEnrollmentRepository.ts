import { ClassEnrollment, Prisma } from "@prisma/client";

export interface IClassEnrollmentRepository {
  getEnrollmentById(id: string): Promise<ClassEnrollment | null>;
  getEnrollmentsByUserId(userId: string): Promise<ClassEnrollment[]>;
  getEnrollmentsByClassId(classId: string): Promise<ClassEnrollment[]>;
  createEnrollment(
    data: Prisma.ClassEnrollmentCreateInput
  ): Promise<ClassEnrollment>;
  updateEnrollment(
    id: string,
    data: Prisma.ClassEnrollmentUpdateInput
  ): Promise<ClassEnrollment>;
  deleteEnrollment(id: string): Promise<void>;
}
