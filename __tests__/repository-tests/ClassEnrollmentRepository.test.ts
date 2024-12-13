import { ClassEnrollmentRepository } from "@/app/(kita)/repositories/ClassEnrollmentRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { ClassEnrollment, Role } from "@prisma/client";

describe("ClassEnrollmentRepository", () => {
  let repository: ClassEnrollmentRepository;

  beforeAll(() => {
    repository = new ClassEnrollmentRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockEnrollments: ClassEnrollment[] = [
    {
      id: "e8da9e9e-383a-470d-ba82-dead3a91e4d3",
      userId: "f8f11b46-429f-4242-8943-061ede86d7aa",
      classId: "bef6bc78-ff79-40ca-92a5-91ad519d0436",
      role: Role.STUDENT,
    },
    {
      id: "e2",
      userId: "f8f11b46-429f-4242-8943-061ede86d7aa",
      classId: "93e64942-dd47-47d8-a014-7304ae75b073",
      role: Role.PROFESSOR,
    },
    {
      id: "e3",
      userId: "user2",
      classId: "bef6bc78-ff79-40ca-92a5-91ad519d0436",
      role: Role.STUDENT,
    },
  ];

  describe("getEnrollmentById", () => {
    it("should return an enrollment when found", async () => {
      const mockEnrollment = mockEnrollments[0];
      mockPrisma.classEnrollment.findUnique.mockResolvedValue(mockEnrollment);

      const result = await repository.getEnrollmentById(mockEnrollment.id);

      expect(mockPrisma.classEnrollment.findUnique).toHaveBeenCalledWith({
        where: { id: mockEnrollment.id },
        include: {
          user: true,
          class: true,
        },
      });
      expect(result).toEqual(mockEnrollment);
    });

    it("should return null when enrollment is not found", async () => {
      mockPrisma.classEnrollment.findUnique.mockResolvedValue(null);

      const result = await repository.getEnrollmentById("non-existent-id");

      expect(mockPrisma.classEnrollment.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          user: true,
          class: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getEnrollmentsByUserId", () => {
    it("should return a list of enrollments for a user", async () => {
      const userEnrollments = mockEnrollments.filter(
        (enrollment) =>
          enrollment.userId === "f8f11b46-429f-4242-8943-061ede86d7aa"
      );
      mockPrisma.classEnrollment.findMany.mockResolvedValue(userEnrollments);

      const result = await repository.getEnrollmentsByUserId(
        "f8f11b46-429f-4242-8943-061ede86d7aa"
      );

      expect(mockPrisma.classEnrollment.findMany).toHaveBeenCalledWith({
        where: { userId: "f8f11b46-429f-4242-8943-061ede86d7aa" },
        include: {
          class: true,
        },
      });
      expect(result).toEqual(userEnrollments);
    });

    it("should return an empty array when no enrollments are found", async () => {
      mockPrisma.classEnrollment.findMany.mockResolvedValue([]);

      const result = await repository.getEnrollmentsByUserId(
        "non-existent-user"
      );

      expect(mockPrisma.classEnrollment.findMany).toHaveBeenCalledWith({
        where: { userId: "non-existent-user" },
        include: {
          class: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("getEnrollmentsByClassId", () => {
    it("should return a list of enrollments for a class", async () => {
      const classEnrollments = mockEnrollments.filter(
        (enrollment) =>
          enrollment.classId === "bef6bc78-ff79-40ca-92a5-91ad519d0436"
      );
      mockPrisma.classEnrollment.findMany.mockResolvedValue(classEnrollments);

      const result = await repository.getEnrollmentsByClassId(
        "bef6bc78-ff79-40ca-92a5-91ad519d0436"
      );

      expect(mockPrisma.classEnrollment.findMany).toHaveBeenCalledWith({
        where: { classId: "bef6bc78-ff79-40ca-92a5-91ad519d0436" },
        include: {
          user: true,
        },
      });
      expect(result).toEqual(classEnrollments);
    });

    it("should return an empty array when no enrollments are found", async () => {
      mockPrisma.classEnrollment.findMany.mockResolvedValue([]);

      const result = await repository.getEnrollmentsByClassId(
        "non-existent-class"
      );

      expect(mockPrisma.classEnrollment.findMany).toHaveBeenCalledWith({
        where: { classId: "non-existent-class" },
        include: {
          user: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createEnrollment", () => {
    it("should create and return a new enrollment", async () => {
      const createData = {
        user: { connect: { id: "user3" } },
        class: { connect: { id: "class3" } },
        role: Role.STUDENT,
      };

      const createdEnrollment: ClassEnrollment = {
        id: "e4",
        userId: "user3",
        classId: "class3",
        role: Role.STUDENT,
      };

      mockPrisma.classEnrollment.create.mockResolvedValue(createdEnrollment);

      const result = await repository.createEnrollment(createData);

      expect(mockPrisma.classEnrollment.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          user: true,
          class: true,
        },
      });
      expect(result).toEqual(createdEnrollment);
    });
  });

  describe("updateEnrollment", () => {
    it("should update and return the enrollment", async () => {
      const updateData = { role: Role.PROFESSOR };
      const enrollmentToUpdate = mockEnrollments[0];
      const updatedEnrollment = { ...enrollmentToUpdate, ...updateData };

      mockPrisma.classEnrollment.update.mockResolvedValue(updatedEnrollment);

      const result = await repository.updateEnrollment(
        enrollmentToUpdate.id,
        updateData
      );

      expect(mockPrisma.classEnrollment.update).toHaveBeenCalledWith({
        where: { id: enrollmentToUpdate.id },
        data: updateData,
        include: {
          user: true,
          class: true,
        },
      });
      expect(result).toEqual(updatedEnrollment);
    });
  });

  describe("deleteEnrollment", () => {
    it("should delete the enrollment", async () => {
      const enrollmentToDelete = mockEnrollments[0];
      mockPrisma.classEnrollment.delete.mockResolvedValue(enrollmentToDelete);

      await repository.deleteEnrollment(enrollmentToDelete.id);

      expect(mockPrisma.classEnrollment.delete).toHaveBeenCalledWith({
        where: { id: enrollmentToDelete.id },
      });
    });
  });
});
