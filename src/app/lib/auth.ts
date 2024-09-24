export async function getManagementToken() {
  const res = await fetch(
    `https://${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: "client_credentials",
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed to obtain management token:", data);
    throw new Error("Failed to obtain management token");
  }

  return data.access_token;
}
