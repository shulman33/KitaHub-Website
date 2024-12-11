import SubmissionStatusWidget from "@/app/(kita)/components/SubmissionStatusWidget";
import DiscussionBoardWidget from "@/app/(kita)/components/DiscussionBoardWidget";
import Header from "@/app/(kita)/components/Header";
import Grid from "@mui/material/Grid2";
import UpcomingAssignmentsStudent from "../components/UpcomingAssignments";
import CoursesWidget from "./CoursesWidget";
import { getClassesByUserId } from "../server/actions/ClassActions";
import { getMessagesByUserId } from "../server/actions/MessageActions";

interface StudentDashboardProps {
  name: string;
}



const StudentDashboard = async ({ name }: StudentDashboardProps) => {
  const messages = await getMessagesByUserId(
    "321c5abe-d519-48fa-8ed3-54f5263b5990"
  );
  console.log("messages", messages);
  const courses = await getClassesByUserId();
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
