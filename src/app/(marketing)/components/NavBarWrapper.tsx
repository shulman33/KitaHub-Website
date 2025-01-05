// components/NavBarWrapper.tsx
import NavBar from "./navbar";
import { getSession } from "@auth0/nextjs-auth0";
import { SerializedSession } from "@/app/(marketing)/lib/types";

export default async function NavBarWrapper() {
  const session = await getSession();

  const serializedSession: SerializedSession | null = session
    ? {
        user: {
          name: session.user?.name,
          email: session.user?.email,
          picture: session.user?.picture,
          sub: session.user?.sub,
        },
        isAuthenticated: true,
      }
    : null;

  return <NavBar session={serializedSession} />;
}
