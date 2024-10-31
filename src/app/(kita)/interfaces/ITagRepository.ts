import { Tag, Prisma } from "@prisma/client";

export interface ITagRepository {
  getTagById(id: string): Promise<Tag | null>;
  getTagByName(name: string): Promise<Tag | null>;
  getAllTags(): Promise<Tag[]>;
  createTag(data: Prisma.TagCreateInput): Promise<Tag>;
  updateTag(id: string, data: Prisma.TagUpdateInput): Promise<Tag>;
  deleteTag(id: string): Promise<void>;
}
