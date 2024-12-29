import { getSession } from "@auth0/nextjs-auth0";
import StudentClassDashboard from "../../components/StudentComponents/StudentClassDashboard";
import ProfessorClassDashboard from "../../components/ProfessorComponents/ProfessorClassDashboard";
import { getUserRole } from "../../lib/auth";
import { notFound } from "next/navigation";
import { getClassById } from "../../server/actions/classActions";

interface ClassDashboardProps {
  params: {
    classId: string;
  };
}

export default async function Page({ params }: { params: Promise<{ classId: string }> }) {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { name } = session.user;

  const classId = (await params).classId;
  const classData = await getClassById(classId);
  if (!classData) notFound();

  const role = await getUserRole(session.user.sub);
  const isStudent = role === "Student";

  return (
    <div>
      {isStudent ? (
        <StudentClassDashboard name={name} classData={classData} />
      ) : (
        <ProfessorClassDashboard name={name} classData={classData} />
      )}
    </div>
  );
}
