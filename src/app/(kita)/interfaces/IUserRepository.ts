import { SelectUser, InsertUser } from "@/app/db/schema";

export interface IUserRepository {
  getUserById(id: string): Promise<SelectUser | null>;
  getUserByEmail(email: string): Promise<SelectUser | null>;
  getUserBySchoolEmail(schoolEmail: string): Promise<SelectUser | null>;
  getAllUsers(): Promise<SelectUser[]>;
  createUser(data: InsertUser): Promise<SelectUser>;
  updateUser(id: string, data: InsertUser): Promise<SelectUser>;
  deleteUser(id: string): Promise<void>;
}
