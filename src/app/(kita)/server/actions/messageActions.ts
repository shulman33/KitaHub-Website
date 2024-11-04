"use server";

import { MessageRepository } from "../../repositories/MessageRepository";
import { getServerSession } from "../../lib/auth";
import { Prisma } from "@prisma/client";

const messageRepo = new MessageRepository();

export async function getMessagesByClassId(classId: string) {
  try {
    const session = await getServerSession();
    return await messageRepo.getMessagesByClassId(classId);
  } catch (error) {
    console.error("Error fetching messages by class ID:", error);
    throw new Error("Could not fetch messages");
  }
}

export async function getRepliesByMessageId(messageId: string) {
  try {
    await getServerSession();
    return await messageRepo.getRepliesByMessageId(messageId);
  } catch (error) {
    console.error("Error fetching replies by message ID:", error);
    throw new Error("Could not fetch replies");
  }
}

export async function createMessage(data: Prisma.MessageCreateInput) {
  try {
    await getServerSession();
    return await messageRepo.createMessage(data);
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Could not create message");
  }
}

export async function updateMessage(
  id: string,
  data: Prisma.MessageUpdateInput
) {
  try {
    await getServerSession();
    return await messageRepo.updateMessage(id, data);
  } catch (error) {
    console.error("Error updating message:", error);
    throw new Error("Could not update message");
  }
}

export async function deleteMessage(id: string) {
  try {
    await getServerSession();
    await messageRepo.deleteMessage(id);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Could not delete message");
  }
}
