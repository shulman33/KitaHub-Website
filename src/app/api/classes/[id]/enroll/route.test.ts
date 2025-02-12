import { NextRequest, NextResponse } from "next/server";
import { POST } from "./route";
import { db } from "@/app/db/drizzle";
import { validateAuthenticatedRequest } from "@/app/(kita)/lib/authUtils";
import { classTable, classEnrollment } from "@/app/db/schema";

// Mock dependencies
jest.mock("@/app/db/drizzle", () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
  },
}));

jest.mock("@/app/(kita)/lib/authUtils", () => ({
  validateAuthenticatedRequest: jest.fn(),
  handleRouteError: jest.fn(),
}));

describe("POST /api/classes/[id]/enroll", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockClassId = "class-123";
  const mockUserId = "user-123";
  const mockParams = Promise.resolve({ id: mockClassId });
  const mockEnrollmentCode = "ABC123";

  // Helper to create mock request
  const createMockRequest = (body: any) => {
    return new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  // Mock database query responses
  const mockClassDetails = {
    id: mockClassId,
    enrollmentCode: mockEnrollmentCode,
    isActive: true,
  };

  test("should return 401 when user is not authenticated", async () => {
    // Mock auth failure
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue(
      NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
    );

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(401);
    expect(await response!.json()).toEqual({
      error: "User is not authenticated",
    });
  });

  test("should successfully enroll student in class", async () => {
    // Mock successful auth
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue({
      userId: mockUserId,
    });

    // Mock class lookup
    const mockSelect = jest.fn().mockReturnValue([mockClassDetails]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockSelect,
      }),
    });

    // Mock no existing enrollment
    const mockEnrollmentSelect = jest.fn().mockReturnValue([]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockEnrollmentSelect,
      }),
    });

    // Mock successful enrollment
    const mockEnrollment = {
      userId: mockUserId,
      classId: mockClassId,
      role: "STUDENT",
    };
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockEnrollment]),
      }),
    });

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(200);
    expect(await response!.json()).toEqual(mockEnrollment);
  });

  test("should return 404 when class is not found", async () => {
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue({
      userId: mockUserId,
    });

    // Mock empty class lookup result
    const mockSelect = jest.fn().mockReturnValue([]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockSelect,
      }),
    });

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(404);
    expect(await response!.json()).toEqual({ error: "Class not found" });
  });

  test("should return 403 when enrollment code is invalid", async () => {
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue({
      userId: mockUserId,
    });

    // Mock class lookup with different enrollment code
    const mockSelect = jest.fn().mockReturnValue([
      {
        ...mockClassDetails,
        enrollmentCode: "DIFFERENT",
      },
    ]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockSelect,
      }),
    });

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(403);
    expect(await response!.json()).toEqual({ error: "Invalid enrollment code" });
  });

  test("should return 403 when class is not active", async () => {
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue({
      userId: mockUserId,
    });

    // Mock inactive class
    const mockSelect = jest.fn().mockReturnValue([
      {
        ...mockClassDetails,
        isActive: false,
      },
    ]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockSelect,
      }),
    });

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(403);
    expect(await response!.json()).toEqual({ error: "Class is not active" });
  });

  test("should return 409 when user is already enrolled", async () => {
    (validateAuthenticatedRequest as jest.Mock).mockResolvedValue({
      userId: mockUserId,
    });

    // Mock class lookup
    const mockSelect = jest.fn().mockReturnValue([mockClassDetails]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockSelect,
      }),
    });

    // Mock existing enrollment
    const mockEnrollmentSelect = jest.fn().mockReturnValue([
      {
        userId: mockUserId,
        classId: mockClassId,
      },
    ]);
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: mockEnrollmentSelect,
      }),
    });

    const request = createMockRequest({ enrollmentCode: mockEnrollmentCode });
    const response = await POST({ params: mockParams }, request);

    expect(response!.status).toBe(409);
    expect(await response!.json()).toEqual({
      error: "User is already enrolled in this class",
    });
  });
});
