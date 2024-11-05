import NavBar from "./navbar";
import { getSession } from "@auth0/nextjs-auth0";

export default async function NavBarWrapper() {
  const session = await getSession(); 
  return <NavBar session={session} />;
}
