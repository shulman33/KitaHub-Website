"use server";

import { db } from "@/app/db/drizzle";
import {
  message,
  user,
  classTable,
  InsertMessage,
  SelectMessage,
  classEnrollment,
} from "@/app/db/schema";
import { eq, inArray } from "drizzle-orm";
import { ExtendedSelectMessage } from "../../lib/types";
import { isEnrolledInClassSubquery, currentUserId } from "../../lib/utils";
import { desc, and } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import { revalidatePath } from "next/cache";
import { pusherServer } from "../../lib/pusher/pusher";
import { EVENT_TYPES, getChannelNames } from "../../lib/pusher/pusher";

/**
 * Fetches messages from the database based on provided filters and limit.
 *
 * This helper function centralizes the common logic for querying messages,
 * including selecting necessary fields, performing joins, applying filters,
 * ordering, and limiting results.
 *
 * @async
 * @function fetchMessages
 * @param {any} filters - SQL conditions to apply in the WHERE clause. These should be constructed using Drizzle ORM's query builders or utility functions.
 * @param {number} limit - The maximum number of messages to retrieve.
 * @returns {Promise<ExtendedSelectMessage[]>} - A promise that resolves to an array of formatted messages.
 * @throws {Error} - Throws an error if the database query fails.
 *
 * @example
 * const filters = isEnrolledInClass(message.classId);
 * const messages = await fetchMessages(filters, 10);
 */
async function fetchMessages(
  filters: any,
  limit: number
): Promise<ExtendedSelectMessage[] | []> {
  try {
    // First get unique message IDs
    const uniqueMessageIds = await db
      .select({ id: message.id })
      .from(message)
      .innerJoin(classEnrollment, eq(message.classId, classEnrollment.classId))
      .where(filters)
      .groupBy(message.id)
      .orderBy(desc(message.id))
      .limit(limit);

    // Then get full message details for these IDs
    const result = await db
      .select({
        id: message.id,
        classId: message.classId,
        userId: message.userId,
        parentMessageId: message.parentMessageId,
        title: message.title,
        content: message.content,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        userProfilePicture: user.profilePicture,
        className: classTable.className,
      })
      .from(message)
      .innerJoin(user, eq(message.userId, user.id))
      .innerJoin(classTable, eq(message.classId, classTable.id))
      .where(
        inArray(
          message.id,
          uniqueMessageIds.map((m) => m.id)
        )
      )
      .orderBy(desc(message.createdAt));

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

    return selectMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

/**
 * Retrieves messages for a specific class, ensuring the user is enrolled in that class.
 *
 * This function fetches messages belonging to a particular class (`classId`)
 * only if the current user is enrolled in that class. It leverages the
 * `fetchMessages` helper to execute the query with appropriate filters and limit.
 *
 * @async
 * @function getMessagesByClassId
 * @param {string} classId - The unique identifier of the class whose messages are to be retrieved.
 * @returns {Promise<ExtendedSelectMessage[]>} - A promise that resolves to an array of messages associated with the specified class.
 *
 * @throws {Error} - Throws an error if fetching messages fails.
 *
 * @example
 * const classId = "123e4567-e89b-12d3-a456-426614174000";
 * const classMessages = await getMessagesByClassId(classId);
 */
export async function getMessagesByClassId(
  classId: string,
  authUserId: string
): Promise<ExtendedSelectMessage[]> {
  const filters = and(
    isEnrolledInClassSubquery(message.classId, authUserId),
    eq(message.classId, classId)
  );

  const limit = 10;

  return fetchMessages(filters, limit);
}

/**
 * Retrieves all messages from classes the current user is enrolled in,
 * along with the author's first name, last name, profile picture, and class name.
 *
 * This function ensures that only messages from classes where the user is
 * enrolled are fetched. It utilizes the `fetchMessages` helper to perform
 * the database query with the appropriate filters and limit.
 *
 * @async
 * @function getMessagesByCurrentUser
 * @returns {Promise<ExtendedSelectMessage[]>} - A promise that resolves to an array of messages from enrolled classes.
 *
 * @throws {Error} - Throws an error if fetching messages fails.
 *
 * @example
 * const userMessages = await getMessagesByCurrentUser();
 */
export async function getMessagesByCurrentUser(
  authUserId: string
): Promise<ExtendedSelectMessage[] | []> {
  const filters = isEnrolledInClassSubquery(message.classId, authUserId);

  const limit = 4;

  return fetchMessages(filters, limit);
}

/**
 * Retrieves all replies to a specific message, ensuring the user is enrolled in the class of the original message.
 *
 * This function fetches all replies (child messages) associated with a given
 * `messageId`. It ensures that the current user is enrolled in the class
 * to which the original message belongs before retrieving the replies.
 *
 * @async
 * @function getRepliesByMessageId
 * @param {string} messageId - The unique identifier of the original message for which replies are to be fetched.
 * @returns {Promise<ExtendedSelectMessage[]>} - A promise that resolves to an array of reply messages.
 *
 * @throws {Error} - Throws an error if the original message is not found or if fetching replies fails.
 *
 * @example
 * const originalMessageId = "123e4567-e89b-12d3-a456-426614174000";
 * const replies = await getRepliesByMessageId(originalMessageId);
 */

export async function getRepliesByMessageId(
  messageId: string,
  authUserId: string
): Promise<ExtendedSelectMessage[]> {
  const filters = and(
    isEnrolledInClassSubquery(message.classId, authUserId),
    eq(message.parentMessageId, messageId)
  );

  const limit = 20;

  return fetchMessages(filters, limit);
}

/**
 * Retrieves a single message by its unique identifier, ensuring the user is enrolled in the class.
 *
 * This function fetches a specific message based on the provided `messageId`. It
 * verifies that the current user is enrolled in the class associated with the
 * message before retrieving it. If the message does not exist or the user is
 * not enrolled, the function returns `null`.
 *
 * @async
 * @function getMessageById
 * @param {string} messageId - The unique identifier of the message to retrieve.
 * @returns {Promise<ExtendedSelectMessage | null>} - A promise that resolves to the message object if found, or `null` if not.
 *
 * @throws {Error} - Throws an error if fetching the message fails.
 *
 * @example
 * const messageId = "123e4567-e89b-12d3-a456-426614174000";
 * const message = await getMessageById(messageId);
 */
export async function getMessageById(
  messageId: string,
  authUserId: string
): Promise<ExtendedSelectMessage | null> {
  const filters = and(
    isEnrolledInClassSubquery(message.classId, authUserId),
    eq(message.id, messageId)
  );

  const limit = 1;
  return fetchMessages(filters, limit).then((messages) => messages[0] || null);
}

/**
 * Retrieves messages created by a specific user, ensuring access is restricted appropriately.
 *
 * This function fetches messages authored by the user identified by `id`. It
 * ensures that the current user has the necessary permissions to view these
 * messages, possibly based on enrollment or other access controls.
 *
 * @async
 * @function getMessagesByUserId
 * @param {string} id - The unique identifier of the user whose messages are to be retrieved.
 * @returns {Promise<ExtendedSelectMessage[]>} - A promise that resolves to an array of messages authored by the specified user.
 *
 * @throws {Error} - Throws an error if fetching messages fails.
 *
 * @example
 * const userId = "123e4567-e89b-12d3-a456-426614174000";
 * const userMessages = await getMessagesByUserId(userId);
 */
export async function getMessagesByUserId(
  id: string
): Promise<ExtendedSelectMessage[]> {
  const filters = eq(message.userId, id);
  const limit = 10;

  return fetchMessages(filters, limit);
}

/**
 * Creates a new message in the database.
 *
 * This function inserts a new message record into the database with the provided
 * data. It returns the newly created message, including any auto-generated fields
 * such as `id` or timestamps.
 *
 * @async
 * @function createMessage
 * @param {InsertMessage} data - An object containing the necessary fields to create a new message.
 * @returns {Promise<SelectMessage>} - A promise that resolves to the newly created message.
 *
 * @throws {Error} - Throws an error if the message creation fails.
 *
 * @example
 * const newMessageData = {
 *   classId: "123e4567-e89b-12d3-a456-426614174000",
 *   userId: "user-uuid",
 *   title: "New Announcement",
 *   content: "Welcome to the class!",
 *   parentMessageId: null, // If it's a top-level message
 * };
 * const newMessage = await createMessage(newMessageData);
 */
export async function createMessage(
  data: InsertMessage,
  authUserId: string
): Promise<SelectMessage> {
  try {
    // Check if user is enrolled in the class
    const enrollment = await db
      .select()
      .from(classEnrollment)
      .where(
        and(
          eq(classEnrollment.classId, data.classId),
          eq(classEnrollment.userId, currentUserId(authUserId))
        )
      );

    if (!enrollment.length) {
      throw new Error("User must be enrolled in the class to create messages");
    }

    const newMessage = await db.insert(message).values(data).returning();

    // Pusher triggers remain the same
    await pusherServer.trigger(
      getChannelNames.classDiscussion(newMessage[0].classId),
      EVENT_TYPES.NEW_MESSAGE,
      newMessage[0]
    );

    if (newMessage[0].parentMessageId) {
      await pusherServer.trigger(
        getChannelNames.messageThread(newMessage[0].parentMessageId),
        EVENT_TYPES.NEW_MESSAGE,
        newMessage[0]
      );
    }
    // revalidatePath("/api/messages");
    return newMessage[0];
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Could not create message");
  }
}

/**
 * Updates an existing message in the database.
 *
 * This function modifies the fields of an existing message identified by `id`
 * with the provided `data`. It returns the updated message, allowing the
 * caller to confirm the changes. If the message does not exist, it may return `undefined`.
 *
 * @async
 * @function updateMessage
 * @param {string} id - The unique identifier of the message to update.
 * @param {InsertMessage} data - An object containing the fields to update in the message.
 * @returns {Promise<SelectMessage | undefined>} - A promise that resolves to the updated message, or `undefined` if the message was not found.
 *
 * @throws {Error} - Throws an error if the message update fails.
 *
 * @example
 * const messageId = "123e4567-e89b-12d3-a456-426614174000";
 * const updatedData = {
 *   title: "Updated Announcement",
 *   content: "Welcome to the updated class!",
 * };
 * const updatedMessage = await updateMessage(messageId, updatedData);
 */
export async function updateMessage(
  id: string,
  authUserId: string,
  data: InsertMessage
) {
  try {
    // First get the existing message
    const existingMessage = await db
      .select()
      .from(message)
      .where(eq(message.id, id));

    if (!existingMessage.length) {
      throw new Error("Message not found");
    }

    // Check if user is enrolled and is the author
    const canUpdate = await db
      .select()
      .from(classEnrollment)
      .where(
        and(
          eq(classEnrollment.classId, existingMessage[0].classId),
          eq(classEnrollment.userId, currentUserId(authUserId)),
          eq(message.userId, currentUserId(authUserId))
        )
      );

    if (!canUpdate.length) {
      throw new Error("Not authorized to update this message");
    }

    const updatedMessage = await db
      .update(message)
      .set(data)
      .where(eq(message.id, id))
      .returning();

    return updatedMessage[0];
  } catch (error) {
    console.error("Error updating message:", error);
    throw new Error("Could not update message");
  }
}

/**
 * Deletes a message from the database.
 *
 * This function removes a message identified by `id` from the database. It ensures
 * that the user attempting to delete the message is enrolled in the class associated
 * with the message, thereby enforcing access controls.
 *
 * @async
 * @function deleteMessage
 * @param {string} id - The unique identifier of the message to delete.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 *
 * @throws {Error} - Throws an error if the message deletion fails or if access is denied.
 *
 * @example
 * const messageId = "123e4567-e89b-12d3-a456-426614174000";
 * await deleteMessage(messageId);
 */
export async function deleteMessage(
  id: string,
  authUserId: string
): Promise<void> {
  try {
    // First get the message to check ownership
    const existingMessage = await db
      .select()
      .from(message)
      .where(eq(message.id, id));

    if (!existingMessage.length) {
      throw new Error("Message not found");
    }

    await db.delete(message).where(
      and(
        isEnrolledInClassSubquery(message.classId, authUserId),
        eq(message.id, id),
        eq(message.userId, currentUserId(authUserId)) // Ensure user is the author
      )
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Could not delete message");
  }
}
