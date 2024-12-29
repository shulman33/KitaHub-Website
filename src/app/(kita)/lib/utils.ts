import universities from "./universities.json"
import { University, UniversityResult } from "./types"
import { AnyColumn, sql } from "drizzle-orm";

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

export const currentUserId = sql`(
    SELECT u.id
    FROM "user" u
    WHERE u."auth0UserId" = auth.user_id()
  )`;

export const currentUserRole = sql`
  (
    SELECT u.role
    FROM "user" u
    WHERE u."auth0UserId" = auth.user_id()
  )
`;

export const isEnrolledInClass = (classIdColumn: AnyColumn) => sql`
  EXISTS (
    SELECT 1
    FROM "class_enrollment" ce
    WHERE ce."classId" = ${classIdColumn}
      AND ce."userId" = ${currentUserId}
  )
`;

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
