import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import StudentDashboard from "@/app/(kita)/components/StudentDashboard";
import ProfessorDashboard from "../components/ProfessorDashboard";
import { getUserRole } from "../lib/auth";

export default withPageAuthRequired(async function MainDashboard() {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { name, id } = session.user;
  const role = await getUserRole(session.user.sub);
  const isStudent = role === "Student";

  return (
    <main>
      {isStudent ? (
        <StudentDashboard name={name} isStudent={isStudent} authUserId={id} />
      ) : (
        <ProfessorDashboard name={name} isStudent={isStudent} authUserId={id} />
      )}
    </main>
  );
});
