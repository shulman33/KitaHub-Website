// tests/repositories/MessageRepository.test.ts
import { MessageRepository } from "@/app/(kita)/repositories/MessageRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Message } from "@prisma/client";

describe("MessageRepository", () => {
  let repository: MessageRepository;

  beforeAll(() => {
    repository = new MessageRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMessages: Message[] = [
    {
      id: "m1",
      classId: "class1",
      userId: "user1",
      parentMessageId: null,
      content: "This is a test message.",
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Test Message",
    },
    {
      id: "m2",
      classId: "class1",
      userId: "user2",
      parentMessageId: "m1",
      content: "This is a reply to the test message.",
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Reply to Test Message",
    },
    {
      id: "m3",
      classId: "class2",
      userId: "user1",
      parentMessageId: null,
      content: "Another test message.",
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Another Test Message",
    },
  ];

  describe("getMessageById", () => {
    it("should return a message when found", async () => {
      const mockMessage = mockMessages[0];
      mockPrisma.message.findUnique.mockResolvedValue(mockMessage);

      const result = await repository.getMessageById(mockMessage.id);

      expect(mockPrisma.message.findUnique).toHaveBeenCalledWith({
        where: { id: mockMessage.id },
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
      expect(result).toEqual(mockMessage);
    });

    it("should return null when message is not found", async () => {
      mockPrisma.message.findUnique.mockResolvedValue(null);

      const result = await repository.getMessageById("non-existent-id");

      expect(mockPrisma.message.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getMessagesByClassId", () => {
    it("should return messages for a specific class", async () => {
      const classMessages = mockMessages.filter(
        (msg) => msg.classId === "class1"
      );
      mockPrisma.message.findMany.mockResolvedValue(classMessages);

      const result = await repository.getMessagesByClassId("class1");

      expect(mockPrisma.message.findMany).toHaveBeenCalledWith({
        where: { classId: "class1" },
        include: {
          user: true,
          replies: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      expect(result).toEqual(classMessages);
    });

    it("should return an empty array when no messages are found", async () => {
      mockPrisma.message.findMany.mockResolvedValue([]);

      const result = await repository.getMessagesByClassId(
        "non-existent-class"
      );

      expect(mockPrisma.message.findMany).toHaveBeenCalledWith({
        where: { classId: "non-existent-class" },
        include: {
          user: true,
          replies: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("getRepliesByMessageId", () => {
    it("should return replies for a specific message", async () => {
      const replies = mockMessages.filter(
        (msg) => msg.parentMessageId === "m1"
      );
      mockPrisma.message.findMany.mockResolvedValue(replies);

      const result = await repository.getRepliesByMessageId("m1");

      expect(mockPrisma.message.findMany).toHaveBeenCalledWith({
        where: { parentMessageId: "m1" },
        include: {
          user: true,
          tags: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      expect(result).toEqual(replies);
    });

    it("should return an empty array when no replies are found", async () => {
      mockPrisma.message.findMany.mockResolvedValue([]);

      const result = await repository.getRepliesByMessageId(
        "non-existent-message"
      );

      expect(mockPrisma.message.findMany).toHaveBeenCalledWith({
        where: { parentMessageId: "non-existent-message" },
        include: {
          user: true,
          tags: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createMessage", () => {
    it("should create and return a new message", async () => {
      const createData = {
        content: "New message content",
        class: { connect: { id: "class1" } },
        user: { connect: { id: "user3" } },
        parentMessage: { connect: { id: "m1" } },
      };

      const createdMessage: Message = {
        id: "m4",
        classId: "class1",
        userId: "user3",
        parentMessageId: "m1",
        content: createData.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "New Message",
      };

      mockPrisma.message.create.mockResolvedValue(createdMessage);

      const result = await repository.createMessage(createData);

      expect(mockPrisma.message.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
      expect(result).toEqual(createdMessage);
    });
  });

  describe("updateMessage", () => {
    it("should update and return the message", async () => {
      const updateData = { content: "Updated message content" };
      const messageToUpdate = mockMessages[0];
      const updatedMessage = { ...messageToUpdate, ...updateData };

      mockPrisma.message.update.mockResolvedValue(updatedMessage);

      const result = await repository.updateMessage(
        messageToUpdate.id,
        updateData
      );

      expect(mockPrisma.message.update).toHaveBeenCalledWith({
        where: { id: messageToUpdate.id },
        data: updateData,
        include: {
          class: true,
          user: true,
          replies: true,
          tags: true,
        },
      });
      expect(result).toEqual(updatedMessage);
    });
  });

  describe("deleteMessage", () => {
    it("should delete the message", async () => {
      const messageToDelete = mockMessages[0];
      mockPrisma.message.delete.mockResolvedValue(messageToDelete);

      await repository.deleteMessage(messageToDelete.id);

      expect(mockPrisma.message.delete).toHaveBeenCalledWith({
        where: { id: messageToDelete.id },
      });
    });
  });
});
