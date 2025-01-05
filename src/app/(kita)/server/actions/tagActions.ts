// "user server";
// import { TagRepository } from "../../repositories/TagRepository";
// import { getServerSession, userHasRole } from "../../lib/auth";
// import { Prisma } from "@prisma/client";

// const tagRepo = new TagRepository();

// export async function getTagById(tagId: string) {
//   try {
//     await getServerSession();
//     return await tagRepo.getTagById(tagId);
//   } catch (error) {
//     console.error("Error fetching tag by ID:", error);
//     throw new Error("Could not fetch tag");
//   }
// }

// export async function getAllTags() {
//   try {
//     await getServerSession();
//     return await tagRepo.getAllTags();
//   } catch (error) {
//     console.error("Error fetching all tags:", error);
//     throw new Error("Could not fetch tags");
//   }
// }

// export async function createTag(data: Prisma.TagCreateInput) {
//   try {
//     await userHasRole("professor");
//     return await tagRepo.createTag(data);
//   } catch (error) {
//     console.error("Error creating tag:", error);
//     throw new Error("Could not create tag");
//   }
// }

// export async function updateTag(id: string, data: Prisma.TagUpdateInput) {
//   try {
//     await userHasRole("professor");
//     return await tagRepo.updateTag(id, data);
//   } catch (error) {
//     console.error("Error updating tag:", error);
//     throw new Error("Could not update tag");
//   }
// }

// export async function deleteTag(id: string) {
//   try {
//     await userHasRole("professor");
//     await tagRepo.deleteTag(id);
//   } catch (error) {
//     console.error("Error deleting tag:", error);
//     throw new Error("Could not delete tag");
//   }
// }
