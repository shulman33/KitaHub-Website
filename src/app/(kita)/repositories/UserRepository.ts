import { Prisma, PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getUserBySchoolEmail(schoolEmail: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { schoolEmail } });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
