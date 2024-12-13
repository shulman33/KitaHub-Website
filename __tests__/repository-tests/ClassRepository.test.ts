import { ClassRepository } from "@/app/(kita)/repositories/ClassRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Class, SemeesterEnum } from "@prisma/client";

describe("ClassRepository", () => {
  let repository: ClassRepository;

  beforeAll(() => {
    repository = new ClassRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockClasses: Class[] = [
    {
      id: "class1",
      universityId: "uni1",
      className: "Computer Science 101",
      descripton: "Intro to Computer Science",
      code: 101,
      semester: SemeesterEnum.FALL,
      year: 2023,
      isActive: true,
    },
    {
      id: "class2",
      universityId: "uni1",
      className: "Mathematics 101",
      descripton: "Intro to Mathematics",
      code: 101,
      semester: SemeesterEnum.FALL,
      year: 2023,
      isActive: false,
    },
    {
      id: "class3",
      universityId: "uni2",
      className: "Physics 101",
      descripton: "Intro to Physics",
      code: 101,
      semester: SemeesterEnum.SPRING,
      year: 2024,
      isActive: true,
    },
  ];

  describe("getClassById", () => {
    it("should return a class when found", async () => {
      const mockClass = mockClasses[0];
      mockPrisma.class.findUnique.mockResolvedValue(mockClass);

      const result = await repository.getClassById(mockClass.id);

      expect(mockPrisma.class.findUnique).toHaveBeenCalledWith({
        where: { id: mockClass.id },
        include: {
          univserity: true,
          classEnrollments: true,
          assignments: true,
          resources: true,
          announcements: true,
          messages: true,
        },
      });
      expect(result).toEqual(mockClass);
    });

    it("should return null when class is not found", async () => {
      mockPrisma.class.findUnique.mockResolvedValue(null);

      const result = await repository.getClassById("non-existent-id");

      expect(mockPrisma.class.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          univserity: true,
          classEnrollments: true,
          assignments: true,
          resources: true,
          announcements: true,
          messages: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getClassesByUniversityId", () => {
    it("should return a list of classes for a university", async () => {
      const uniClasses = mockClasses.filter(
        (cls) => cls.universityId === "uni1"
      );
      mockPrisma.class.findMany.mockResolvedValue(uniClasses);

      const result = await repository.getClassesByUniversityId("uni1");

      expect(mockPrisma.class.findMany).toHaveBeenCalledWith({
        where: { universityId: "uni1" },
        include: {
          univserity: true,
          classEnrollments: true,
        },
      });
      expect(result).toEqual(uniClasses);
    });

    it("should return an empty array when no classes are found", async () => {
      mockPrisma.class.findMany.mockResolvedValue([]);

      const result = await repository.getClassesByUniversityId(
        "non-existent-uni"
      );

      expect(mockPrisma.class.findMany).toHaveBeenCalledWith({
        where: { universityId: "non-existent-uni" },
        include: {
          univserity: true,
          classEnrollments: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("getActiveClasses", () => {
    it("should return a list of active classes", async () => {
      const activeClasses = mockClasses.filter((cls) => cls.isActive);
      mockPrisma.class.findMany.mockResolvedValue(activeClasses);

      const result = await repository.getActiveClasses();

      expect(mockPrisma.class.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: {
          univserity: true,
        },
      });
      expect(result).toEqual(activeClasses);
    });

    it("should return an empty array when no active classes are found", async () => {
      mockPrisma.class.findMany.mockResolvedValue([]);

      const result = await repository.getActiveClasses();

      expect(mockPrisma.class.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        include: {
          univserity: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createClass", () => {
    it("should create and return a new class", async () => {
      const createData = {
        className: "Chemistry 101",
        descripton: "Intro to Chemistry",
        code: 101,
        semester: SemeesterEnum.FALL,
        year: 2023,
        isActive: true,
        univserity: { connect: { id: "uni1" } },
      };

      const createdClass: Class = {
        id: "class4",
        universityId: "uni1",
        className: createData.className,
        descripton: createData.descripton,
        code: createData.code,
        semester: createData.semester,
        year: createData.year,
        isActive: createData.isActive,
      };

      mockPrisma.class.create.mockResolvedValue(createdClass);

      const result = await repository.createClass(createData);

      expect(mockPrisma.class.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          univserity: true,
        },
      });
      expect(result).toEqual(createdClass);
    });
  });

  describe("updateClass", () => {
    it("should update and return the class", async () => {
      const updateData = { className: "Updated Class Name" };
      const classToUpdate = mockClasses[0];
      const updatedClass = { ...classToUpdate, ...updateData };

      mockPrisma.class.update.mockResolvedValue(updatedClass);

      const result = await repository.updateClass(classToUpdate.id, updateData);

      expect(mockPrisma.class.update).toHaveBeenCalledWith({
        where: { id: classToUpdate.id },
        data: updateData,
        include: {
          univserity: true,
        },
      });
      expect(result).toEqual(updatedClass);
    });
  });

  describe("deleteClass", () => {
    it("should delete the class", async () => {
      const classToDelete = mockClasses[0];
      mockPrisma.class.delete.mockResolvedValue(classToDelete);

      await repository.deleteClass(classToDelete.id);

      expect(mockPrisma.class.delete).toHaveBeenCalledWith({
        where: { id: classToDelete.id },
      });
    });
  });
});
