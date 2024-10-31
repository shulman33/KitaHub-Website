import UpcomingDeadline from "@/app/(kita)/components/UpcomingDeadlineWidget";
import SubmissionStatusWidget from "@/app/(kita)/components/SubmissionStatusWidget";
import UpcomingAssignmentsWidget from "@/app/(kita)/components/UpcomingAssignmentsWidget";
import NewDiscussionBoardWidget from "@/app/(kita)/components/NewDiscussionBoardWidget";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "@/app/(kita)/components/Header";

export default withPageAuthRequired(async function MainDashboard() {
  const session = await getSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { user } = session;

  return (
    <main>
      <Header name={user.name} />
      <div className="mx-auto max-w-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 md:col-span-7">
            <UpcomingAssignmentsWidget />
          </div>

          <div className="col-span-4 md:col-span-5">
            <NewDiscussionBoardWidget />
          </div>

          <div className="col-span-4 md:col-span-5">
            <UpcomingDeadline month="September" year={2024} />
          </div>

          <div className="col-span-4 md:col-span-7">
            <SubmissionStatusWidget />
          </div>
        </div>
      </div>
    </main>
  );
});
