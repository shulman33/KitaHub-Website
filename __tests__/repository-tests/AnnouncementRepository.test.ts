import { AnnouncementRepository } from "@/app/(kita)/repositories/AnnouncementRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Announcement } from "@prisma/client";

describe("AnnouncementRepository", () => {
  let repository: AnnouncementRepository;

  beforeAll(() => {
    repository = new AnnouncementRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAnnouncements: Announcement[] = [
    {
      id: "4990e258-0db8-4899-934c-8071ce11beaf",
      classId: "2902fb8d-56c0-4da4-a10f-f3d864700730",
      userId: "e208d375-a083-4cc4-8e57-a4a9d507c10e",
      title: "Test Announcement 1",
      content: "This is the first test announcement.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5990e258-0db8-4899-934c-8071ce11beaf",
      classId: "2902fb8d-56c0-4da4-a10f-f3d864700730",
      userId: "f308d375-a083-4cc4-8e57-a4a9d507c10e",
      title: "Test Announcement 2",
      content: "This is the second test announcement.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  describe("getAnnouncementById", () => {
    it("should return an announcement when found", async () => {
      const mockAnnouncement = mockAnnouncements[0];
      mockPrisma.announcement.findUnique.mockResolvedValue(mockAnnouncement);

      const result = await repository.getAnnouncementById(mockAnnouncement.id);

      expect(mockPrisma.announcement.findUnique).toHaveBeenCalledWith({
        where: { id: mockAnnouncement.id },
        include: { class: true, user: true },
      });
      expect(result).toEqual(mockAnnouncement);
    });

    it("should return null when announcement is not found", async () => {
      mockPrisma.announcement.findUnique.mockResolvedValue(null);

      const result = await repository.getAnnouncementById("non-existent-id");

      expect(mockPrisma.announcement.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: { class: true, user: true },
      });
      expect(result).toBeNull();
    });
  });

  describe("getAnnouncementsByClassId", () => {
    it("should return a list of announcements for a class", async () => {
      mockPrisma.announcement.findMany.mockResolvedValue(mockAnnouncements);

      const classId = "2902fb8d-56c0-4da4-a10f-f3d864700730";
      const result = await repository.getAnnouncementsByClassId(classId);

      expect(mockPrisma.announcement.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual(mockAnnouncements);
    });

    it("should return an empty array when no announcements are found", async () => {
      mockPrisma.announcement.findMany.mockResolvedValue([]);

      const classId = "non-existent-class-id";
      const result = await repository.getAnnouncementsByClassId(classId);

      expect(mockPrisma.announcement.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createAnnouncement", () => {
    it("should create and return a new announcement", async () => {
      const createData = {
        title: "New Announcement",
        content: "Content of the new announcement.",
        class: { connect: { id: "2902fb8d-56c0-4da4-a10f-f3d864700730" } },
        user: { connect: { id: "e208d375-a083-4cc4-8e57-a4a9d507c10e" } },
      };

      const createdAnnouncement: Announcement = {
        id: "6990e258-0db8-4899-934c-8071ce11beaf",
        classId: createData.class.connect.id,
        userId: createData.user.connect.id,
        title: createData.title,
        content: createData.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.announcement.create.mockResolvedValue(createdAnnouncement);

      const result = await repository.createAnnouncement(createData);

      expect(mockPrisma.announcement.create).toHaveBeenCalledWith({
        data: createData,
        include: { class: true, user: true },
      });
      expect(result).toEqual(createdAnnouncement);
    });
  });

  describe("updateAnnouncement", () => {
    it("should update and return the announcement", async () => {
      const updateData = { title: "Updated Announcement" };
      const announcementToUpdate = mockAnnouncements[0];
      const updatedAnnouncement = { ...announcementToUpdate, ...updateData };

      mockPrisma.announcement.update.mockResolvedValue(updatedAnnouncement);

      const result = await repository.updateAnnouncement(
        announcementToUpdate.id,
        updateData
      );

      expect(mockPrisma.announcement.update).toHaveBeenCalledWith({
        where: { id: announcementToUpdate.id },
        data: updateData,
        include: { class: true, user: true },
      });
      expect(result).toEqual(updatedAnnouncement);
    });
  });

  describe("deleteAnnouncement", () => {
    it("should delete the announcement", async () => {
      const announcementToDelete = mockAnnouncements[0];
      mockPrisma.announcement.delete.mockResolvedValue(announcementToDelete);

      await repository.deleteAnnouncement(announcementToDelete.id);

      expect(mockPrisma.announcement.delete).toHaveBeenCalledWith({
        where: { id: announcementToDelete.id },
      });
    });
  });
});
