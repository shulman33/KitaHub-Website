import { AssignmentRepository } from "@/app/(kita)/repositories/AssignmentRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Assignment } from "@prisma/client";

describe("AssignmentRepository", () => {
  let repository: AssignmentRepository;

  beforeAll(() => {
    repository = new AssignmentRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockAssignments: Assignment[] = [
    {
      id: "b28fbb98-ea24-42e5-b235-26d633115915",
      classId: "b635a329-9aa4-4219-bc2c-c116df486e9e",
      title: "Assignment 1",
      description: "First assignment description",
      dueDate: new Date("2023-12-31"),
      totalPoints: 100,
      isUploded: false,
      url: null,
      isGraded: false,
      isPubished: true,
    },
    {
      id: "f49574d2-ecf8-44dc-923f-b7f647de14f1",
      classId: "b635a329-9aa4-4219-bc2c-c116df486e9e",
      title: "Assignment 2",
      description: "Second assignment description",
      dueDate: new Date("2024-01-15"),
      totalPoints: 100,
      isUploded: false,
      url: null,
      isGraded: false,
      isPubished: true,
    },
  ];

  describe("getAssignmentById", () => {
    it("should return an assignment when found", async () => {
      const mockAssignment = mockAssignments[0];
      mockPrisma.assignment.findUnique.mockResolvedValue(mockAssignment);

      const result = await repository.getAssignmentById(mockAssignment.id);

      expect(mockPrisma.assignment.findUnique).toHaveBeenCalledWith({
        where: { id: mockAssignment.id },
        include: {
          class: true,
          grades: true,
          resources: true,
        },
      });
      expect(result).toEqual(mockAssignment);
    });

    it("should return null when assignment is not found", async () => {
      mockPrisma.assignment.findUnique.mockResolvedValue(null);

      const result = await repository.getAssignmentById("non-existent-id");

      expect(mockPrisma.assignment.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          class: true,
          grades: true,
          resources: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getAssignmentsByClassId", () => {
    it("should return a list of assignments for a class", async () => {
      mockPrisma.assignment.findMany.mockResolvedValue(mockAssignments);

      const classId = "class1";
      const result = await repository.getAssignmentsByClassId(classId);

      expect(mockPrisma.assignment.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: {
          class: true,
          grades: true,
          resources: true,
        },
        orderBy: {
          dueDate: "asc",
        },
      });
      expect(result).toEqual(mockAssignments);
    });

    it("should return an empty array when no assignments are found", async () => {
      mockPrisma.assignment.findMany.mockResolvedValue([]);

      const classId = "non-existent-class-id";
      const result = await repository.getAssignmentsByClassId(classId);

      expect(mockPrisma.assignment.findMany).toHaveBeenCalledWith({
        where: { classId },
        include: {
          grades: true,
          resources: true,
        },
        orderBy: {
          dueDate: "asc",
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createAssignment", () => {
    it("should create and return a new assignment", async () => {
      const createData = {
        title: "New Assignment",
        description: "New assignment description",
        dueDate: new Date("2024-02-01"),
        totalPoints: 100,
        isPubished: true,
        class: { connect: { id: "class1" } },
      };

      const createdAssignment: Assignment = {
        id: "a3",
        classId: "class1",
        title: createData.title,
        description: createData.description,
        dueDate: createData.dueDate,
        totalPoints: createData.totalPoints,
        isUploded: false,
        url: null,
        isGraded: false,
        isPubished: createData.isPubished,
      };

      mockPrisma.assignment.create.mockResolvedValue(createdAssignment);

      const result = await repository.createAssignment(createData);

      expect(mockPrisma.assignment.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          class: true,
          grades: true,
          resources: true,
        },
      });
      expect(result).toEqual(createdAssignment);
    });
  });

  describe("updateAssignment", () => {
    it("should update and return the assignment", async () => {
      const updateData = { title: "Updated Assignment Title" };
      const assignmentToUpdate = mockAssignments[0];
      const updatedAssignment = { ...assignmentToUpdate, ...updateData };

      mockPrisma.assignment.update.mockResolvedValue(updatedAssignment);

      const result = await repository.updateAssignment(
        assignmentToUpdate.id,
        updateData
      );

      expect(mockPrisma.assignment.update).toHaveBeenCalledWith({
        where: { id: assignmentToUpdate.id },
        data: updateData,
        include: {
          class: true,
          grades: true,
          resources: true,
        },
      });
      expect(result).toEqual(updatedAssignment);
    });
  });

  describe("deleteAssignment", () => {
    it("should delete the assignment", async () => {
      const assignmentToDelete = mockAssignments[0];
      mockPrisma.assignment.delete.mockResolvedValue(assignmentToDelete);

      await repository.deleteAssignment(assignmentToDelete.id);

      expect(mockPrisma.assignment.delete).toHaveBeenCalledWith({
        where: { id: assignmentToDelete.id },
      });
    });
  });
});
