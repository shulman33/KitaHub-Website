import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getMessagesByClassId } from "@/app/(kita)/server/actions/messageActions";
import DiscussionBoard from "@/app/(kita)/components/DiscussionBoard";
import { notFound } from "next/navigation";
import { getUserRole } from "@/app/(kita)/lib/auth";

interface DiscussionBoardPageProps {
  params: {
    classId: string;
  };
}

export default withPageAuthRequired(async function DiscussionBoardPage({
  params,
}: DiscussionBoardPageProps) {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const messages = await getMessagesByClassId(params.classId);
  if (!messages) notFound();

  return <DiscussionBoard messages={messages} classId={params.classId} />;
});
