"use server";

import {
  CompleteProfileResponse,
  CompleteProfileRequestBody,
  APIError,
} from "../(marketing)/lib/types";

function getEnvironmentUrl() {
  switch (process.env.ENVIRONMENT) {
    case "dev":
      return "https://kitahub-website-git-auth-sams-projects-07810362.vercel.app";
    case "prod":
      return "https://kitahub.io";
    default:
      return "http://localhost:3000";
  }
}

export async function updateProfile(
  data: CompleteProfileRequestBody
): Promise<CompleteProfileResponse> {
  const baseUrl = getEnvironmentUrl();
  const url = `${baseUrl}/api/update-profile`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      (responseData as APIError).error || "Failed to update profile"
    );
  }

  return responseData as CompleteProfileResponse;
}
