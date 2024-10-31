import { User, Prisma } from "@prisma/client";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserBySchoolEmail(schoolEmail: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
