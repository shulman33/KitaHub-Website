import { findUniversityByEmail } from "@/app/(kita)/lib/utils";

describe("findUniversityByEmail", () => {
  test("should find university for exact domain match", () => {
    const email = "student@yu.edu";
    const result = findUniversityByEmail(email);

    expect(result).toEqual({
      name: "Yeshiva University",
      country: "United States",
      alphaTwoCode: "US",
      stateProvince: null,
    });
  });

  test("should find university for subdomain match", () => {
    const email = "sshulma5@mail.yu.edu";
    const result = findUniversityByEmail(email);

    expect(result).toEqual({
      name: "Yeshiva University",
      country: "United States",
      alphaTwoCode: "US",
      stateProvince: null,
    });
  });

  test("should return null for non-matching email", () => {
    const email = "user@example.com";
    const result = findUniversityByEmail(email);

    expect(result).toBeNull();
  });

  test("should be case-insensitive in domain matching", () => {
    const email = "Student@Mail.YU.EDU";
    const result = findUniversityByEmail(email);

    expect(result).toEqual({
      name: "Yeshiva University",
      country: "United States",
      alphaTwoCode: "US",
      stateProvince: null,
    });
  });

  test("should handle emails with multiple subdomains", () => {
    const email = "user@dept.mail.yu.edu";
    const result = findUniversityByEmail(email);

    expect(result).toEqual({
      name: "Yeshiva University",
      country: "United States",
      alphaTwoCode: "US",
      stateProvince: null,
    });
  });
});