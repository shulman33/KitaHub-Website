// tests/class.test.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { getClassesForCurrentUser } from "@/app/(kita)/server/actions/classActions";
import { user, classTable, classEnrollment, university } from "@/app/db/schema";

const sql = neon(process.env.TEST_DATABASE_URL!);
const db = drizzle({ client: sql });

describe("getClassesForCurrentUser", () => {
  const testData = {
    university: {
      name: "Test University",
      country: "US",
      alphaTwoCode: "US",
      state: "CA",
    },
    professor: {
      auth0UserId: "auth0|prof123",
      firstName: "John",
      lastName: "Doe",
      role: "PROFESSOR" as "PROFESSOR",
      schoolEmail: "prof@university.edu",
    },
    student: {
      auth0UserId: "auth0|student123",
      firstName: "Jane",
      lastName: "Smith",
      role: "STUDENT" as "STUDENT",
      schoolEmail: "student@university.edu",
    },
    class: {
      className: "Test Class",
      description: "Test Description",
      semester: "FALL" as "FALL",
      year: 2024,
      isActive: true,
    },
  };

  beforeAll(async () => {
    console.log(
      "Database URL:",
      process.env.TEST_DATABASE_URL?.slice(0, 20) + "..."
    );
    // Create university
    const [uni] = await db
      .insert(university)
      .values(testData.university)
      .returning();
    console.log("University created:", uni);

    // Create professor and student
    const [prof] = await db
      .insert(user)
      .values({
        ...testData.professor,
        universityId: uni.id,
      })
      .returning();

    const [student] = await db
      .insert(user)
      .values({
        ...testData.student,
        universityId: uni.id,
      })
      .returning();

    // Create class
    const [cls] = await db
      .insert(classTable)
      .values({
        ...testData.class,
        universityId: uni.id,
      })
      .returning();

    // Create enrollments
    await db.insert(classEnrollment).values([
      { userId: prof.id, classId: cls.id, role: "PROFESSOR" },
      { userId: student.id, classId: cls.id, role: "STUDENT" },
    ]);
  });

  afterAll(async () => {
    await db.delete(classEnrollment);
    await db.delete(classTable);
    await db.delete(user);
    await db.delete(university);
  });

  it("should return classes for student", async () => {
    const classes = await getClassesForCurrentUser(
      testData.student.auth0UserId
    );
    console.log("Classes:", classes);

    expect(classes).toHaveLength(1);
    expect(classes[0]).toMatchObject({
      className: testData.class.className,
      professorName: `${testData.professor.firstName} ${testData.professor.lastName}`,
    });
  });

  it("should return empty array for non-enrolled user", async () => {
    const classes = await getClassesForCurrentUser("auth0|nonexistent");
    expect(classes).toHaveLength(0);
  });
});
