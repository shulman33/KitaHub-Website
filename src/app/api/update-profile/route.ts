// src/app/api/update-profile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getManagementToken } from '@/app/lib/auth'; 

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
    console.log("Received POST request to /api/update-profile");

    const body = await req.json();

    const {
      session_token,
      firstName,
      lastName,
      acceptedTOS,
      universityEmail,
      isProfessor,
    } = body as CompleteProfileRequestBody;

    if (!session_token) {
      console.log("Missing session token.");
      return NextResponse.json(
        { error: "Missing session token." },
        { status: 400 }
      );
    }

    const secret = process.env.REDIRECT_SECRET;
    if (!secret) {
      // console.error("REDIRECT_SECRET is not defined in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    let decoded: SessionTokenPayload;
    try {
      decoded = jwt.verify(session_token, secret) as SessionTokenPayload;
      console.log("Session token verified.");
    } catch (jwtError) {
      // console.error("JWT Verification Error:", jwtError);
      return NextResponse.json(
        { error: "Invalid or expired session token." },
        { status: 400 }
      );
    }

    const userId = decoded.sub;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token payload." },
        { status: 400 }
      );
    }

    const managementToken = await getManagementToken();
    console.log("Obtained Management API token.");

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
      // const errorData = await response.json();
      // console.error("Auth0 API Error:", errorData);
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
      // const roleErrorData = await roleResponse.json();
      // console.error("Auth0 Role API Error:", roleErrorData);
      return NextResponse.json(
        { error: "Failed to update user roles." },
        { status: roleResponse.status }
      );
    }

    console.log("User profile and role updated successfully.");
    return NextResponse.json(
      { message: "Profile and role updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error processing profile completion:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
