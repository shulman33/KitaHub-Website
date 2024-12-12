import SubmissionStatusWidget from "@/app/(kita)/components/SubmissionStatusWidget";
import DiscussionBoardWidget from "@/app/(kita)/components/DiscussionBoardWidget";
import Header from "@/app/(kita)/components/Header";
import Grid from "@mui/material/Grid2";
import UpcomingAssignmentsStudent from "../components/UpcomingAssignments";
import CoursesWidget from "./CoursesWidget";
import { getClassesForCurrentUser } from "../server/actions/classActions";
import { getMessagesByCurrentUser, getMessagesByUserId } from "../server/actions/messageActions";

interface StudentDashboardProps {
  name: string;
}



const StudentDashboard = async ({ name }: StudentDashboardProps) => {
  const messages = await getMessagesByCurrentUser();
  console.log("messages", messages);
  const courses = await getClassesForCurrentUser();
  console.log("courses", courses);
  return (
    <>
      <Header name={name} />
      <div className="mx-auto max-w-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 7 }}>
            <CoursesWidget courses={courses} />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <DiscussionBoardWidget messages={messages} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <SubmissionStatusWidget />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <UpcomingAssignmentsStudent />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default StudentDashboard;
