import React from "react";
import CompleteProfileForm from "./CompleteProfileForm";

interface SearchParams {
  session_token: string;
  state: string;
}

interface StateType {
  message?: string;
  redirectUrl?: string;
}

export default async function CompleteProfilePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sessionToken = searchParams.session_token || "";
  const stateParam = searchParams.state || "";

  if (!sessionToken) {
    return (
      <div className="bg-gray-50 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Invalid Access</h1>
          <p>Missing session token. Please try logging in again.</p>
        </div>
      </div>
    );
  }

  async function completeProfileAction(
    state: StateType,
    formData: FormData
  ): Promise<StateType> {
    "use server";

    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const universityEmail = formData.get("universityEmail")?.toString() || "";
    const role = formData.get("role")?.toString() || "";
    const agree = formData.get("agree") === "on";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(universityEmail)) {
      return { message: "Please enter a valid university email address." };
    }

    if (!role) {
      return { message: "Please select your role." };
    }

    if (!agree) {
      return { message: "You must accept the Terms of Service." };
    }

    const enviromentUrlMapping = () => {
      switch (process.env.ENVIROMENT) {
        case "dev":
          return "https://kitahub-website-git-auth-sams-projects-07810362.vercel.app";
        case "prod":
          return "https://kitahub.io";
        default:
          return "http://localhost:3000";
      }
    };

    const url = `${enviromentUrlMapping()}/api/update-profile`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_token: sessionToken,
          firstName: firstName,
          lastName: lastName,
          agreeTOS: agree,
          universityEmail: universityEmail,
          isProfessor: role === "professor",
        }),
      });

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        return { message: "Received non-JSON response from the server." };
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          return {
            message: "Invalid or expired session token. Please log in again.",
          };
        } else {
          return { message: data.error || "Failed to update profile." };
        }
      }

      if (!process.env.AUTH0_ISSUER_BASE_URL) {
        console.error("AUTH0_ISSUER_BASE_URL is not defined");
      }

      const redirectUrl = `${
        process.env.AUTH0_ISSUER_BASE_URL
      }/continue?state=${encodeURIComponent(stateParam)}`;

      return { redirectUrl };
    } catch (err: any) {
      console.error("Submission error:", err);
      return { message: err.message || "An unexpected error occurred." };
    }
  }

  return <CompleteProfileForm action={completeProfileAction} />;
}
