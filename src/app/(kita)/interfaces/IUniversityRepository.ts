import { InsertUniversity, SelectUniversity } from "@/app/db/schema";

export interface IUniversityRepository {
  createUniversity(data: InsertUniversity): Promise<SelectUniversity>;
  getOrCreateUniversity(
    data: InsertUniversity
  ): Promise<SelectUniversity>;
}
