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
