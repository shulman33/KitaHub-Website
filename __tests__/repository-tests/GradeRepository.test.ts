import { GradeRepository } from "@/app/(kita)/repositories/GradeRepository";
import prismaMock, {
  mockPrisma,
} from "../../src/app/(kita)/lib/testing/mockClient";
import { Grade } from "@prisma/client";

describe("GradeRepository", () => {
  let repository: GradeRepository;

  beforeAll(() => {
    repository = new GradeRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockGrades: Grade[] = [
    {
      id: "g1",
      assignmentId: "a1",
      studentId: "s1",
      score: 85,
      feedBack: "Good job",
      gradedAt: new Date(),
    },
    {
      id: "g2",
      assignmentId: "a1",
      studentId: "s2",
      score: 90,
      feedBack: "Excellent work",
      gradedAt: new Date(),
    },
    {
      id: "g3",
      assignmentId: "a2",
      studentId: "s1",
      score: 75,
      feedBack: "Needs improvement",
      gradedAt: new Date(),
    },
  ];

  describe("getGradeById", () => {
    it("should return a grade when found", async () => {
      const mockGrade = mockGrades[0];
      mockPrisma.grade.findUnique.mockResolvedValue(mockGrade);

      const result = await repository.getGradeById(mockGrade.id);

      expect(mockPrisma.grade.findUnique).toHaveBeenCalledWith({
        where: { id: mockGrade.id },
        include: {
          assignment: true,
          student: true,
        },
      });
      expect(result).toEqual(mockGrade);
    });

    it("should return null when grade is not found", async () => {
      mockPrisma.grade.findUnique.mockResolvedValue(null);

      const result = await repository.getGradeById("non-existent-id");

      expect(mockPrisma.grade.findUnique).toHaveBeenCalledWith({
        where: { id: "non-existent-id" },
        include: {
          assignment: true,
          student: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("getGradesByAssignmentId", () => {
    it("should return grades for a specific assignment", async () => {
      const assignmentGrades = mockGrades.filter(
        (grade) => grade.assignmentId === "a1"
      );
      mockPrisma.grade.findMany.mockResolvedValue(assignmentGrades);

      const result = await repository.getGradesByAssignmentId("a1");

      expect(mockPrisma.grade.findMany).toHaveBeenCalledWith({
        where: { assignmentId: "a1" },
        include: {
          student: true,
        },
      });
      expect(result).toEqual(assignmentGrades);
    });

    it("should return an empty array when no grades are found", async () => {
      mockPrisma.grade.findMany.mockResolvedValue([]);

      const result = await repository.getGradesByAssignmentId(
        "non-existent-assignment"
      );

      expect(mockPrisma.grade.findMany).toHaveBeenCalledWith({
        where: { assignmentId: "non-existent-assignment" },
        include: {
          student: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("getGradesByStudentId", () => {
    it("should return grades for a specific student", async () => {
      const studentGrades = mockGrades.filter(
        (grade) => grade.studentId === "s1"
      );
      mockPrisma.grade.findMany.mockResolvedValue(studentGrades);

      const result = await repository.getGradesByStudentId("s1");

      expect(mockPrisma.grade.findMany).toHaveBeenCalledWith({
        where: { studentId: "s1" },
        include: {
          assignment: true,
        },
      });
      expect(result).toEqual(studentGrades);
    });

    it("should return an empty array when no grades are found", async () => {
      mockPrisma.grade.findMany.mockResolvedValue([]);

      const result = await repository.getGradesByStudentId(
        "non-existent-student"
      );

      expect(mockPrisma.grade.findMany).toHaveBeenCalledWith({
        where: { studentId: "non-existent-student" },
        include: {
          assignment: true,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe("createGrade", () => {
    it("should create and return a new grade", async () => {
      const createData = {
        score: 95,
        feedBack: "Outstanding performance",
        assignment: { connect: { id: "a3" } },
        student: { connect: { id: "s3" } },
      };

      const createdGrade: Grade = {
        id: "g4",
        assignmentId: "a3",
        studentId: "s3",
        score: createData.score,
        feedBack: createData.feedBack,
        gradedAt: new Date(),
      };

      mockPrisma.grade.create.mockResolvedValue(createdGrade);

      const result = await repository.createGrade(createData);

      expect(mockPrisma.grade.create).toHaveBeenCalledWith({
        data: createData,
        include: {
          assignment: true,
          student: true,
        },
      });
      expect(result).toEqual(createdGrade);
    });
  });

  describe("updateGrade", () => {
    it("should update and return the grade", async () => {
      const updateData = { score: 88, feedBack: "Well done" };
      const gradeToUpdate = mockGrades[0];
      const updatedGrade = { ...gradeToUpdate, ...updateData };

      mockPrisma.grade.update.mockResolvedValue(updatedGrade);

      const result = await repository.updateGrade(gradeToUpdate.id, updateData);

      expect(mockPrisma.grade.update).toHaveBeenCalledWith({
        where: { id: gradeToUpdate.id },
        data: updateData,
        include: {
          assignment: true,
          student: true,
        },
      });
      expect(result).toEqual(updatedGrade);
    });
  });

  describe("deleteGrade", () => {
    it("should delete the grade", async () => {
      const gradeToDelete = mockGrades[0];
      mockPrisma.grade.delete.mockResolvedValue(gradeToDelete);

      await repository.deleteGrade(gradeToDelete.id);

      expect(mockPrisma.grade.delete).toHaveBeenCalledWith({
        where: { id: gradeToDelete.id },
      });
    });
  });
});
