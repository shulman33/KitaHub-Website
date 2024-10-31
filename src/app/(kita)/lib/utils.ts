import universities from "./universities.json"
import { University, UniversityResult } from "./types"

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
          alpha_two_code: university.alpha_two_code,
          state_province: university["state-province"] || null,
        };
      }
    }
  }
  return null;
}