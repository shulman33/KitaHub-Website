import { NextRequest, NextResponse } from "next/server";
import { findUniversityByEmail } from "../../(kita)/lib/utils";
import { UniversityRepository } from "../../(kita)/repositories/UniversityRepository";

export async function POST(req: NextRequest) {
  try {
    console.log("Received request to update user profile.");

    const data = await req.json();
    console.log("Request body: ", data);

    if (!data.universityEmail) {
      return NextResponse.json(
        { error: "university_email is required" },
        { status: 400 }
      );
    }

    const { universityEmail } = data;

    const universityData = findUniversityByEmail(universityEmail);
    if (!universityData) {
      return NextResponse.json(
        { error: "Invalid university email." },
        { status: 400 }
      );
    } 
    console.log("University email is valid.");

    const universityRepository = new UniversityRepository();

    console.log("Finding or creating a university in Drizzle.");
    const { id } = await universityRepository.getOrCreateUniversity({
      name: universityData.name,
      country: universityData.country,
      alphaTwoCode: universityData.alphaTwoCode,
      state: universityData.stateProvince,
    });
    console.log("University created in Drizzle.");

    return NextResponse.json(
      {
        message: "University email is valid and university saved",
        universityId: id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error verifying and saving university:", error);
    return NextResponse.json(
      { error: "Failed to verify and save university" },
      { status: 500 }
    );
  }
}
