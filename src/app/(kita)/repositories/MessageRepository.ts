import { PrismaClient, Message, Prisma } from "@prisma/client";
import { IMessageRepository } from "../interfaces/IMessageRepository";

export class MessageRepository implements IMessageRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  async getMessageById(id: string): Promise<Message | null> {
    try {
      return await this.prisma.message.findUnique({
        where: { id },
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error fetching message by ID:", error);
      throw new Error("Error fetching message by ID");
    }
  }

  async getMessagesByClassId(classId: string): Promise<Message[]> {
    try {
      return await this.prisma.message.findMany({
        where: { classId },
        include: {
          user: true,
          replies: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.error("Error fetching messages by class ID:", error);
      throw new Error("Error fetching messages by class ID");
    }
  }

  async getRepliesByMessageId(parentMessageId: string): Promise<Message[]> {
    try {
      return await this.prisma.message.findMany({
        where: { parentMessageId },
        include: {
          user: true,
          tags: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.error("Error fetching replies by message ID:", error);
      throw new Error("Error fetching replies by message ID");
    }
  }

  async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    try {
      return await this.prisma.message.create({
        data,
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error creating message:", error);
      throw new Error("Error creating message");
    }
  }

  async updateMessage(
    id: string,
    data: Prisma.MessageUpdateInput
  ): Promise<Message> {
    try {
      return await this.prisma.message.update({
        where: { id },
        data,
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error("Error updating message:", error);
      throw new Error("Error updating message");
    }
  }

  async deleteMessage(id: string): Promise<void> {
    try {
      await this.prisma.message.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      throw new Error("Error deleting message");
    }
  }
}
