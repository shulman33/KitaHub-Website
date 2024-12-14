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