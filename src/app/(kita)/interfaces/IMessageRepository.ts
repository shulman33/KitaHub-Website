import { Message, Prisma } from "@prisma/client";

export interface IMessageRepository {
  getMessageById(id: string): Promise<Message | null>;
  getMessagesByClassId(classId: string): Promise<Message[]>;
  getRepliesByMessageId(parentMessageId: string): Promise<Message[]>;
  createMessage(data: Prisma.MessageCreateInput): Promise<Message>;
  updateMessage(id: string, data: Prisma.MessageUpdateInput): Promise<Message>;
  deleteMessage(id: string): Promise<void>;
}
