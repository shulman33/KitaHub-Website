import { NextRequest, NextResponse } from "next/server";
import { getManagementToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {

  const body = await req.formData();
  const university = body.get("university");
  const isProfessor = body.get("isProfessor") === "on";

  const managementToken = await getManagementToken();

  const res = await fetch(
    `https://${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${managementToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_metadata: {
          university,
          isProfessor,
          profileCompleted: true,
        },
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }

  // TODO: get the original state from the query string
  const originalState = "THE_ORIGINAL_STATE";
  const redirectUrl = `https://${process.env.AUTH0_ISSUER_BASE_URL}/continue?state=${originalState}`;

  return NextResponse.redirect(redirectUrl);
}
