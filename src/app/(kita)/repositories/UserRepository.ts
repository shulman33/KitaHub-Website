import { IUserRepository } from "../interfaces/IUserRepository";
import { db } from "@/app/db/drizzle";
import { user, SelectUser, InsertUser } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { redis } from "@/app/cache/redis";


export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<SelectUser | null> {
    const result = await db.selectDistinct().from(user).where(eq(user.id, id));

    return result[0];
  }

  async getUserByEmail(email: string): Promise<SelectUser | null> {
    const result = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.email, email));

    return result[0];
  }

  async getUserBySchoolEmail(schoolEmail: string): Promise<SelectUser | null> {
    const result = await db
      .selectDistinct()
      .from(user)
      .where(eq(user.schoolEmail, schoolEmail));
    return result[0];
  }

  async getAllUsers(): Promise<SelectUser[]> {
    const result = await db.selectDistinct().from(user);
    return result;
  }

  async createUser(data: InsertUser): Promise<SelectUser> {
    const result = await db.insert(user).values(data).returning();
    // await redis.hset(`user:${result[0].id}`, JSON.stringify(result[0]));
    return result[0];
  }

  async updateUser(id: string, data: InsertUser): Promise<SelectUser> {
    const result = await db
      .update(user)
      .set(data)
      .where(eq(user.id, id))
      .returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(user).where(eq(user.id, id));
  }
}
