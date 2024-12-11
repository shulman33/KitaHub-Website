"use server";

import { dbAuth } from "@/app/db/drizzle";
import {
  message,
  user,
  classTable,
  InsertMessage,
  SelectMessage,
  classEnrollment
} from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { ExtendedMessage, ExtendedSelectMessage } from "../../lib/types";
import { isEnrolledInClass } from "../../lib/utils";
import { desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";


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

/**
 * Fetches all messages from classes the current user is enrolled in,
 * along with the author's first name, last name, profile picture, and class name.
 *
 * @returns {Promise<SelectMessage[]>} An array of messages with additional fields.
 */

// enable filter messages by classId if filter param is passed
export async function getMessagesByCurrentUser(): Promise<
  ExtendedSelectMessage[]
> {
  try {
    // Use dbAuth to ensure the query is executed in the context of the authenticated user
    const messages = await dbAuth(async (db) => {
      // Build the query
      const result = await db
        .select({
          // Selecting fields from the Message table
          id: message.id,
          classId: message.classId,
          userId: message.userId,
          parentMessageId: message.parentMessageId,
          title: message.title,
          content: message.content,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,

          // Selecting additional fields from the User table
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userProfilePicture: user.profilePicture,

          // Selecting additional field from the Class table
          className: classTable.className,
        })
        .from(message)
        // Join with ClassEnrollment to ensure enrollment
        .innerJoin(
          classEnrollment,
          eq(message.classId, classEnrollment.classId)
        )
        // Join with User to get author details
        .innerJoin(user, eq(message.userId, user.id))
        // Join with Class table to get className
        .innerJoin(classTable, eq(message.classId, classTable.id))
        // Apply the enrollment filter using the updated helper
        .where(isEnrolledInClass(message.classId))
        // Optional: Order messages by creation date descending
        .orderBy(desc(message.createdAt))
        .limit(4);

      // Map the result to the ExtendedSelectMessage type
      const selectMessages: ExtendedSelectMessage[] = result.map((msg) => ({
        id: msg.id,
        classId: msg.classId,
        userId: msg.userId,
        parentMessageId: msg.parentMessageId,
        title: msg.title,
        content: msg.content,
        createdAt: msg.createdAt,
        createdAtRelative: formatDistanceToNow(new Date(msg.createdAt), {
          addSuffix: true,
        }),
        updatedAt: msg.updatedAt,
        userFirstName: msg.userFirstName,
        userLastName: msg.userLastName,
        userProfilePicture: msg.userProfilePicture,
        className: msg.className,
      }));

      console.log("Fetched Messages:", selectMessages);
      return selectMessages;
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages for current user:", error);
    throw new Error("Failed to fetch messages.");
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
