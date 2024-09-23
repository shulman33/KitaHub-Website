import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Page() {
    const session = await getSession();

    return (
      <main>
        <h1>Welcome {session?.user.name}</h1>
        <h3>Access Token</h3>
        <pre>
          {JSON.stringify({ accessToken: session?.accessToken }, null, 2)}
        </pre>
        <h3>User</h3>
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
        <a href="/api/auth/logout">Logout</a>
      </main>
    );
  },
  { returnTo: "/dashboard" }
);
