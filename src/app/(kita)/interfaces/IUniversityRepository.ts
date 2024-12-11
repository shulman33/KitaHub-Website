import { University, Prisma } from "@prisma/client";

export interface IUniversityRepository {
  getUniversityById(id: string): Promise<University | null>;
  getAllUniversities(): Promise<University[]>;
  createUniversity(data: Prisma.UniversityCreateInput): Promise<University>;
  getOrCreateUniversity(
    data: Prisma.UniversityCreateInput
  ): Promise<University>;
  updateUniversity(
    id: string,
    data: Prisma.UniversityUpdateInput
  ): Promise<University>;
  deleteUniversity(id: string): Promise<void>;
}
