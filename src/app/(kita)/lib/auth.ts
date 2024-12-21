import { getSession } from "@auth0/nextjs-auth0";

export async function getServerSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function userHasRole(requiredRole: string) {
  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const { user } = session;
  const roles = user["https://your-app/roles"] || [];

  if (!roles.includes(requiredRole)) {
    throw new Error("Forbidden: Insufficient role");
  }

  return user;
}

export async function getManagementToken() {
  const res = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_EXPLORER_CLIENT_ID,
      client_secret: process.env.AUTH0_EXPLORER_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed to obtain management token:", data);
    throw new Error("Failed to obtain management token");
  }

  return data.access_token;
}

export async function getUserRole(userId: string) {
  const bearer = await getManagementToken();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${bearer}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const roleResponse = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${encodeURIComponent(
      userId
    )}/roles`,
    requestOptions
  );
  const roleData = await roleResponse.json();

  return roleData[0]?.name || null;
}
