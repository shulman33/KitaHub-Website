"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  message,
  user,
  classTable,
  InsertMessage,
  SelectMessage,
} from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { ExtendedMessage } from "../../lib/types";


export async function getMessagesByClassId(classId: string): Promise<SelectMessage[]> {
  try {
    const result = await dbAuth(async (db) => {
      const messages = await db
        .select()
        .from(message)
        .where(eq(message.classId, classId));

      return messages;
    })
    return result;
  } catch (error) {
    console.error("Error fetching messages by class ID:", error);
    throw new Error("Could not fetch messages");
  }
}

export async function getRepliesByMessageId(messageId: string): Promise<SelectMessage[]> {
  try {
    const result = await dbAuth(async (db) => {
      const replies = await db
        .select()
        .from(message)
        .where(eq(message.parentMessageId, messageId));

      return replies;
    })
    return result;
  } catch (error) {
    console.error("Error fetching replies by message ID:", error);
    throw new Error("Could not fetch replies");
  }
}

export async function getMessageById(messageId: string): Promise<SelectMessage | null> {
  const result = await dbAuth(async (db) => {
    const messages = await db
      .select()
      .from(message)
      .where(eq(message.id, messageId));

    return messages;
  });
  return result[0] || null;
}

// classIds: 37cb4b49-e40f-4852-9975-0923c3800d54, 41191a3c-ba80-4bff-ad97-8c3c2bdd29eb, 89cd2070-92ac-4d3f-9874-61306c9ac28d

// studentId: ab0ff47e-6c40-4992-93b0-4e520b5ba27d

export async function getMessagesByUserId(
  id: string
): Promise<ExtendedMessage[]> {
  const result = await dbAuth(async (db) => {
    const messages = await db
      .select({
        messageId: message.id,
        messageClassId: message.classId,
        messageUserId: message.userId,
        messageParentId: message.parentMessageId,
        messageTitle: message.title,
        messageContent: message.content,
        messageCreatedAt: message.createdAt,
        messageUpdatedAt: message.updatedAt,

        userFirstName: user.firstName,
        userLastName: user.lastName,
        userProfilePicture: user.profilePicture,

        className: classTable.className,
      })
      .from(message)
      .innerJoin(user, eq(message.userId, user.id))
      .innerJoin(classTable, eq(message.classId, classTable.id))
      .where(eq(message.userId, id));

    const extendedMessages: ExtendedMessage[] = messages.map((msg) => ({
      id: msg.messageId,
      classId: msg.messageClassId,
      userId: msg.messageUserId,
      parentMessageId: msg.messageParentId,
      title: msg.messageTitle,
      content: msg.messageContent,
      createdAt: msg.messageCreatedAt,
      updatedAt: msg.messageUpdatedAt,
      firstName: msg.userFirstName,
      lastName: msg.userLastName,
      profilePicture: msg.userProfilePicture,
      className: msg.className,
    }));

    return extendedMessages;
  });

  console.log("messages", result);

  return result;
}


export async function createMessage(data: InsertMessage): Promise<SelectMessage> {
  try {
    const result = await dbAuth(async (db) => {
      const newMessage = await db
        .insert(message)
        .values(data)
        .returning();
      return newMessage[0];
    })
    return result;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Could not create message");
  }
}

export async function updateMessage(
  id: string,
  data: InsertMessage
) {
  try {
    const result = await dbAuth(async (db) => {
      const updatedMessage = await db
        .update(message)
        .set(data)
        .where(eq(message.id, id))
        .returning();
      return updatedMessage[0];
    })
    return result;
  } catch (error) {
    console.error("Error updating message:", error);
    throw new Error("Could not update message");
  }
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    const result = await dbAuth(async (db) => {
      await db
        .delete(message)
        .where(eq(message.id, id));
    })
    return result;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Could not delete message");
  }
}
