import { db } from "@/app/db/drizzle";
import { user } from "@/app/db/schema";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Received request to create user record.");

    const data = await req.json();
    console.log("Request body: ", data);

    const {
      auth0UserId,
      firstName,
      lastName,
      role,
      schoolEmail,
      universityId,
      profilePicture,
      primaryEmail,
    } = data;

    if (
      !auth0UserId ||
      !firstName ||
      !lastName ||
      !role ||
      !schoolEmail ||
      !universityId ||
      !primaryEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userRole = role === "Student" ? "STUDENT" : "PROFESSOR";

    const roleId =
      userRole === "STUDENT" ? "rol_4oBD1Uz01d9AfMMa" : "rol_dIwjCpO7h7RGqneb";

    try {
      await db.insert(user).values({
        auth0UserId: auth0UserId,
        firstName: firstName,
        lastName: lastName,
        role: userRole,
        schoolEmail: schoolEmail,
        email: primaryEmail,
        universityId: universityId,
        profilePicture: profilePicture,
      });
    } catch (error) {
      console.error("Error creating user record:", error);
      return NextResponse.json(
        { error: "Failed to create user record" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User record created", roleId: roleId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user record:", error);
    return NextResponse.json(
      { error: "Failed to create user record" },
      { status: 500 }
    );
  }
}
