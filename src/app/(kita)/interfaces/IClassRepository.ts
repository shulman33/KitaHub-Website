import { Class, Prisma } from "@prisma/client";

export interface IClassRepository {
  getClassById(id: string): Promise<Class | null>;
  getClassesByUniversityId(universityId: string): Promise<Class[]>;
  getActiveClasses(): Promise<Class[]>;
  createClass(data: Prisma.ClassCreateInput): Promise<Class>;
  updateClass(id: string, data: Prisma.ClassUpdateInput): Promise<Class>;
  deleteClass(id: string): Promise<void>;
}
