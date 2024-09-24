// src/app/api/update-profile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getManagementToken } from '@/app/lib/auth'; // Adjust the path as necessary

interface CompleteProfileRequestBody {
  session_token: string;
  firstName: string;
  lastName: string;
  university: string;
  universityEmail: string;
  isProfessor: boolean;
}

interface SessionTokenPayload extends JwtPayload {
  sub: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log('Received POST request to /api/update-profile');

    const body = await req.json();
    console.log('Request body:', body);

    const {
      session_token,
      firstName,
      lastName,
      university,
      universityEmail,
      isProfessor,
    } = body as CompleteProfileRequestBody;

    if (!session_token) {
      console.log('Missing session token.');
      return NextResponse.json({ error: 'Missing session token.' }, { status: 400 });
    }

    // Verify the session token
    const secret = process.env.REDIRECT_SECRET;
    if (!secret) {
      console.error('REDIRECT_SECRET is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    let decoded: SessionTokenPayload;
    try {
      decoded = jwt.verify(session_token, secret) as SessionTokenPayload;
      console.log('Decoded JWT:', decoded);
    } catch (jwtError) {
      console.error('JWT Verification Error:', jwtError);
      return NextResponse.json(
        { error: 'Invalid or expired session token.' },
        { status: 400 }
      );
    }

    const userId = decoded.sub;

    if (!userId) {
      console.log('Invalid token payload. Missing sub.');
      return NextResponse.json({ error: 'Invalid token payload.' }, { status: 400 });
    }

    // Obtain Management API token
    const managementToken = await getManagementToken();
    console.log('Obtained Management API token.');

    // Update the user's app_metadata
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    if (!auth0Domain) {
      console.error('AUTH0_ISSUER_BASE_URL is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://${auth0Domain}/api/v2/users/${encodeURIComponent(userId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${managementToken}`,
        },
        body: JSON.stringify({
          app_metadata: {
            profileComplete: true,
            firstName,
            lastName,
            university,
            universityEmail,
            isProfessor,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Auth0 API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to update user profile.' },
        { status: response.status }
      );
    }

    console.log('User profile updated successfully.');
    return NextResponse.json({ message: 'Profile updated successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Error processing profile completion:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
