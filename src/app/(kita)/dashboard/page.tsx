import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import StudentDashboard from "@/app/(kita)/components/StudentDashboard";
import ProfessorDashboard from "../components/ProfDashboard";

export default withPageAuthRequired(async function MainDashboard() {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { name } = session.user;
  const role = "student";

  return (
    <main>
      {role === "student" ? (
        <StudentDashboard name={name} />
      ) : (
        <ProfessorDashboard name={name} />
      )}
    </main>
  );
});
