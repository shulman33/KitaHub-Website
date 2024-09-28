import UpcomingDeadline from "./components/UpcomingDeadlineWidget";
import SubmissionStatusWidget from "./components/SubmissionStatusWidget";
import UpcomingAssignmentsWidget from "./components/UpcomingAssignmentsWidget";
import NewDiscussionBoardWidget from "./components/NewDiscussionBoardWidget";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "./components/Header";

export default withPageAuthRequired(async function MainDashboard() {
  const session = await getSession();

  // Type assertion: Assert that session is not null or undefined to make TypeScript happy
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { user } = session;

  return (
    <main>
      <Header name={user.name} />
      <div className="mx-auto max-w-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto grid grid-cols-8 max-w-full sm:max-w-7xl gap-4">
          <div className="col-span-8 sm:col-span-4 w-full">
            <UpcomingAssignmentsWidget />
          </div>

          <div className="col-span-8 sm:col-span-4 w-full">
            <NewDiscussionBoardWidget />
          </div>

          <div className="col-span-8 sm:col-span-3 w-full">
            <UpcomingDeadline month="September" year={2024} />
          </div>

          <div className="col-span-8 sm:col-span-5 w-full">
            <SubmissionStatusWidget />
          </div>
        </div>
      </div>
    </main>
  );
});
