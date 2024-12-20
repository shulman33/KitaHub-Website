import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getManagementToken } from "@/app/(marketing)/lib/auth";
import { findUniversityByEmail } from "@/app/(kita)/lib/utils";
import { UserRepository } from "@/app/(kita)/repositories/UserRepository";
import { UniversityRepository } from "@/app/(kita)/repositories/UniversityRepository";

interface CompleteProfileRequestBody {
  session_token: string;
  firstName: string;
  lastName: string;
  acceptedTOS: boolean;
  universityEmail: string;
  isProfessor: boolean;
}

interface SessionTokenPayload extends JwtPayload {
  sub: string;
}

export async function POST(req: NextRequest) {
  try {

    const userRepository = new UserRepository();
    const universityRepository = new UniversityRepository();
    const body = await req.json();

    const {
      session_token,
      firstName,
      lastName,
      acceptedTOS,
      universityEmail,
      isProfessor,
    } = body as CompleteProfileRequestBody;

    console.log("Received request to update user profile.");

    if (!session_token) {
      return NextResponse.json(
        { error: "Missing session token." },
        { status: 400 }
      );
    }

    console.log("Session token provided.");
    console.log("Validating university email.", universityEmail);

    const universityObj = findUniversityByEmail(universityEmail);
    if (!universityObj) {
      return NextResponse.json(
        { error: "Invalid university email." },
        { status: 400 }
      );
    }

    console.log("University email is valid.");

    const secret = process.env.REDIRECT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    console.log("Decoding session token.");

    let decoded: SessionTokenPayload;
    try {
      decoded = jwt.verify(session_token, secret) as SessionTokenPayload;
    } catch (jwtError) {
      return NextResponse.json(
        { error: "Invalid or expired session token." },
        { status: 400 }
      );
    }
    console.log("Session token decoded.");
    const userId = decoded.sub;
    const profilePicture = decoded.picture;
    const personalEmail = decoded.email;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token payload." },
        { status: 400 }
      );
    }

    console.log("Finding or creating a university in Drizzle.");
    const { id } = await universityRepository.getOrCreateUniversity({
      name: universityObj.name,
      country: universityObj.country,
      alphaTwoCode: universityObj.alphaTwoCode,
      state: universityObj.stateProvince,
    });

    console.log("University created in Drizzle.");

    console.log("Creating user profile in Drizzle.");
    const createUserResult = await userRepository.createUser({
      auth0UserId: userId,
      firstName,
      lastName,
      role: isProfessor ? "PROFESSOR" : "STUDENT",
      schoolEmail: universityEmail,
      universityId: id,
      bio: null,
      phoneNumber: null,
      email: personalEmail,
      prefix: null,
      profilePicture: profilePicture,
      dataSharingOptIn: false,
    });
    

    console.log("User profile created in Drizzle.");

    const managementToken = await getManagementToken();

    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    if (!auth0Domain) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${auth0Domain}/api/v2/users/${encodeURIComponent(userId)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${managementToken}`,
        },
        body: JSON.stringify({
          app_metadata: {
            profileComplete: true,
            firstName,
            lastName,
            acceptedTOS: acceptedTOS,
            universityEmail,
            isProfessor,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update user profile." },
        { status: response.status }
      );
    }

    const role = isProfessor ? "rol_dIwjCpO7h7RGqneb" : "rol_4oBD1Uz01d9AfMMa";
    const roleResponse = await fetch(
      `${auth0Domain}/api/v2/users/${encodeURIComponent(userId)}/roles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${managementToken}`,
          "cache-control": "no-cache",
        },
        body: JSON.stringify({
          roles: [role],
        }),
      }
    );

    if (!roleResponse.ok) {
      return NextResponse.json(
        { error: "Failed to update user roles." },
        { status: roleResponse.status }
      );
    }

    console.log("User profile and role updated successfully in Auth0.");
    return NextResponse.json(
      {
        message: "Profile and role updated successfully.",
        user: {
          id: createUserResult.id,
          auth0UserId: createUserResult.auth0UserId,
          firstName,
          lastName,
          role: isProfessor ? "PROFESSOR" : "STUDENT",
          schoolEmail: universityEmail,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
