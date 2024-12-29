import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getManagementToken } from "@/app/(marketing)/lib/auth";
import { findUniversityByEmail } from "@/app/(kita)/lib/utils";
import { UserRepository } from "@/app/(kita)/repositories/UserRepository";
import { UniversityRepository } from "@/app/(kita)/repositories/UniversityRepository";
import { CompleteProfileRequestBody } from "@/app/(marketing)/lib/types";

interface SessionTokenPayload extends JwtPayload {
  sub: string;
  picture?: string;
  email?: string;
}

export async function POST(req: NextRequest) {
  try {
    const userRepository = new UserRepository();
    const universityRepository = new UniversityRepository();
    const body = (await req.json()) as CompleteProfileRequestBody;

    const requiredFields = [
      "session_token",
      "firstName",
      "lastName",
      "acceptedTOS",
      "universityEmail",
    ] as const;

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log("Received request to update user profile.");
    console.log("Session token provided.");

    const universityObj = findUniversityByEmail(body.universityEmail);
    if (!universityObj) {
      return NextResponse.json(
        { error: "Invalid university email." },
        { status: 400 }
      );
    }

    console.log("University email is valid.");

    const secret = process.env.REDIRECT_SECRET;
    if (!secret) {
      throw new Error("Server configuration error: Missing REDIRECT_SECRET");
    }

    console.log("Decoding session token.");

    let decoded: SessionTokenPayload;
    try {
      decoded = jwt.verify(body.session_token, secret) as SessionTokenPayload;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired session token." },
        { status: 400 }
      );
    }
    console.log("Session token decoded.");
    if (!decoded.sub) {
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
    console.log("University Email:", body.universityEmail);
    const user = await userRepository.createUser({
      auth0UserId: decoded.sub,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.isProfessor ? "PROFESSOR" : "STUDENT",
      schoolEmail: body.universityEmail,
      universityId: id,
      bio: null,
      phoneNumber: null,
      email: decoded.email || null,
      prefix: null,
      profilePicture: decoded.picture || null,
      dataSharingOptIn: false,
    });

    console.log("User profile created in Drizzle.");

    const managementToken = await getManagementToken();
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;

    if (!auth0Domain) {
      throw new Error(
        "Server configuration error: Missing AUTH0_ISSUER_BASE_URL"
      );
    }

    await updateAuth0Profile(decoded.sub, body, managementToken, auth0Domain);
    await assignAuth0Role(
      decoded.sub,
      body.isProfessor,
      managementToken,
      auth0Domain
    );

    console.log("User profile and role updated successfully in Auth0.");
    return NextResponse.json({
      message: "Profile and role updated successfully.",
      user: {
        id: user.id,
        auth0UserId: user.auth0UserId,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.isProfessor ? "PROFESSOR" : "STUDENT",
        schoolEmail: body.universityEmail,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

async function updateAuth0Profile(
  userId: string,
  data: CompleteProfileRequestBody,
  token: string,
  domain: string
) {
  const response = await fetch(
    `${domain}/api/v2/users/${encodeURIComponent(userId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        app_metadata: {
          profileComplete: true,
          firstName: data.firstName,
          lastName: data.lastName,
          acceptedTOS: data.acceptedTOS,
          universityEmail: data.universityEmail,
          isProfessor: data.isProfessor,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Auth0 profile");
  }
}

async function assignAuth0Role(
  userId: string,
  isProfessor: boolean,
  token: string,
  domain: string
) {
  const role = isProfessor ? "rol_dIwjCpO7h7RGqneb" : "rol_4oBD1Uz01d9AfMMa";

  const response = await fetch(
    `${domain}/api/v2/users/${encodeURIComponent(userId)}/roles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        roles: [role],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to assign Auth0 role");
  }
}
