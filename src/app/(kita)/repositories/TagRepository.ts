// repositories/TagRepository.ts
import { PrismaClient, Tag, Prisma } from "@prisma/client";
import { ITagRepository } from "../interfaces/ITagRepository";

const prisma = new PrismaClient();

export class TagRepository implements ITagRepository {
  async getTagById(id: string): Promise<Tag | null> {
    try {
      return await prisma.tag.findUnique({
        where: { id },
        include: {
          messages: true,
          resources: true,
        },
      });
    } catch (error) {
      console.error("Error fetching tag by ID:", error);
      throw new Error("Error fetching tag by ID");
    }
  }

  async getTagByName(name: string): Promise<Tag | null> {
    try {
      return await prisma.tag.findUnique({
        where: { name },
        include: {
          messages: true,
          resources: true,
        },
      });
    } catch (error) {
      console.error("Error fetching tag by name:", error);
      throw new Error("Error fetching tag by name");
    }
  }

  async getAllTags(): Promise<Tag[]> {
    try {
      return await prisma.tag.findMany({
        include: {
          messages: true,
          resources: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    } catch (error) {
      console.error("Error fetching all tags:", error);
      throw new Error("Error fetching all tags");
    }
  }

  async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
    try {
      return await prisma.tag.create({
        data,
        include: {
          messages: true,
          resources: true,
        },
      });
    } catch (error) {
      console.error("Error creating tag:", error);
      throw new Error("Error creating tag");
    }
  }

  async updateTag(id: string, data: Prisma.TagUpdateInput): Promise<Tag> {
    try {
      return await prisma.tag.update({
        where: { id },
        data,
        include: {
          messages: true,
          resources: true,
        },
      });
    } catch (error) {
      console.error("Error updating tag:", error);
      throw new Error("Error updating tag");
    }
  }

  async deleteTag(id: string): Promise<void> {
    try {
      await prisma.tag.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw new Error("Error deleting tag");
    }
  }
}
