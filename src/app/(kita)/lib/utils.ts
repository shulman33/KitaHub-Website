import universities from "./universities.json";
import { University, UniversityResult } from "./types";
import { AnyColumn, sql, exists, and } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { classTable, user } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { classEnrollment } from "@/app/db/schema";
import { get } from "http";

export function findUniversityByEmail(email: string): UniversityResult | null {
  const emailDomain = email.split("@")[1].toLowerCase();

  for (const university of universities as University[]) {
    for (const domain of university.domains) {
      const uniDomain = domain.toLowerCase();
      // Check for exact match or subdomain match
      if (emailDomain === uniDomain || emailDomain.endsWith(`.${uniDomain}`)) {
        return {
          name: university.name,
          country: university.country,
          alphaTwoCode: university.alpha_two_code,
          stateProvince: university["state-province"] || null,
        };
      }
    }
  }
  return null;
}

export const professorDataSubquery = db
  .select({
    professorFirstName: user.firstName,
    professorLastName: user.lastName,
    professorProfilePicture: user.profilePicture,
  })
  .from(classEnrollment)
  .innerJoin(user, eq(user.id, classEnrollment.userId))
  .where(
    and(eq(classEnrollment.classId, classTable.id), eq(user.role, "PROFESSOR"))
  )
  .limit(1)
  .as("user");

export const currentUserId = (authUserId: string) => sql`
    SELECT u.id
    FROM "user" u
    WHERE u."auth0UserId" = ${authUserId}
`;

export const userIdSubquery = (authUserId: string) => {
  return db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.auth0UserId, authUserId))
    .limit(1);
  // .as("userId");

  // return userId;
};

export const currentUserRole = sql`
  (
    SELECT u.role
    FROM "user" u
    WHERE u."auth0UserId" = auth.user_id()
  )
`;

// export const isEnrolledInClass = (classIdColumn: AnyColumn, authUserId: string) => sql`
//   EXISTS (
//     SELECT 1
//     FROM "class_enrollment" ce
//     WHERE ce."classId" = ${classIdColumn}
//       AND ce."userId" = ${currentUserId(authUserId)}
//   )
// `;

// export const isEnrolledInClass = (
//   classIdColumn: AnyColumn,
//   authUserId: string
// ) => sql`
//   EXISTS (
//     SELECT 1
//     FROM "class_enrollment" ce
//     WHERE ce."classId" = ${classIdColumn}
//       AND ce."userId" = (
//         SELECT u.id
//         FROM "user" u
//         WHERE u."auth0UserId" = ${authUserId}
//       )
//   )
// `;

export const isEnrolledInClassSubquery = (
  classIdColumn: AnyColumn,
  authUserId: string
) => {
  return exists(
    db
      .select({ field: sql`1` })
      .from(classEnrollment)
      .innerJoin(user, eq(classEnrollment.userId, user.id))
      .where(
        and(
          eq(classEnrollment.classId, classIdColumn),
          eq(classEnrollment.userId, userIdSubquery(authUserId))
        )
      )
  );

  // return isEnrolled;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getEnvironmentUrl = (): string => {
  switch (process.env.ENVIRONMENT) {
    case "dev":
      return "https://kitahub-website-git-auth-sams-projects-07810362.vercel.app";
    case "prod":
      return "https://kitahub.io";
    default:
      return "http://localhost:3000";
  }
};

export function validateUniversityEmail(email: string): boolean {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Add any specific university email validation logic here
  return true;
}

export function validateProfileData(data: {
  firstName: string;
  lastName: string;
  universityEmail: string;
  role: string;
  agree: boolean;
}): { isValid: boolean; error?: string } {
  if (!data.firstName?.trim()) {
    return { isValid: false, error: "First name is required" };
  }

  if (!data.lastName?.trim()) {
    return { isValid: false, error: "Last name is required" };
  }

  if (!validateUniversityEmail(data.universityEmail)) {
    return {
      isValid: false,
      error: "Please enter a valid university email address",
    };
  }

  if (!data.role) {
    return { isValid: false, error: "Please select your role" };
  }

  if (!data.agree) {
    return { isValid: false, error: "You must accept the Terms of Service" };
  }

  return { isValid: true };
}
