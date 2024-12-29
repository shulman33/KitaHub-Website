import React from "react";
import { CompleteProfileForm } from "./CompleteProfileForm";

interface SearchParams {
  session_token: string;
  state: string;
}

export default function CompleteProfilePage({
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

  return (
    <CompleteProfileForm sessionToken={sessionToken} stateParam={stateParam} />
  );
}
