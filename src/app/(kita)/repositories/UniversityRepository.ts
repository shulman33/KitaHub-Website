import { db } from "@/app/db/drizzle";
import {
  SelectUniversity,
  InsertUniversity,
  university,
} from "@/app/db/schema";
import { IUniversityRepository } from "../interfaces/IUniversityRepository";
import { eq } from "drizzle-orm";
import { config } from "dotenv";

config({ path: ".env.local" });


export class UniversityRepository implements IUniversityRepository {

  async createUniversity(data: InsertUniversity): Promise<SelectUniversity> {
    try {
      const result = await db.insert(university).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating university:", error);
      throw new Error("Error creating university");
    }
  }

  async getOrCreateUniversity(
    data: InsertUniversity
  ): Promise<SelectUniversity> {
    try {
      const uniResult = await db
        .selectDistinct()
        .from(university)
        .where(eq(university.name, data.name));

      if (uniResult.length > 0) {
        return uniResult[0];
      } else {
        return await this.createUniversity(data);
      }
    } catch (error) {
      console.error("Error creating or fetching university:", error);
      throw new Error("Error creating or fetching university");
    }
  }
}
