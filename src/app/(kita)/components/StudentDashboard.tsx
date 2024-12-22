import SubmissionStatusWidget from "@/app/(kita)/components/SubmissionStatusWidget";
import DiscussionBoardWidget from "@/app/(kita)/components/DiscussionBoardWidget";
import Header from "@/app/(kita)/components/Header";
import { getClassesForCurrentUser } from "../server/actions/classActions";
import {
  getMessagesByCurrentUser,
  getMessagesByUserId,
} from "../server/actions/messageActions";
import CalendarComponent from "./StudentComponents/CalendarComponent";
import AssignmentWidget from "./AssignmentWidget";
import CoursesWidget from "./CoursesWidget";
import { getCurrentUserAssignment } from "../server/actions/assignmentActions";

interface StudentDashboardProps {
  name: string;
}

// const dummyAssignments = [
//   {
//     name: "Mathematics III",
//     title: "Answer Writing",
//     dueDate: "02:40:55",
//     status: "In Progress",
//   },
//   {
//     name: "Physics II",
//     title: "Quiz Preparation",
//     dueDate: "01:20:15",
//     status: "Submitted",
//   },
//   {
//     name: "Chemistry I",
//     title: "Lab Report",
//     dueDate: "03:10:00",
//     status: "Not Started",
//   },
//   {
//     name: "History II",
//     title: "Essay Submission",
//     dueDate: "04:30:45",
//     status: "In Progress",
//   },
// ];


const StudentDashboard = async ({ name }: StudentDashboardProps) => {
  const messages = await getMessagesByCurrentUser();
  console.log("messages", messages);
  const courses = await getClassesForCurrentUser();
  // console.log("courses", courses);
  const assignments = await getCurrentUserAssignment();
  return (
    <>
      <Header name={name} />
      <div className=" py-16">
        <div className="grid md:grid-cols-2 gap-[30px]">
          {/* <AssignmentWidget courses={dummyAssignments} /> */}
          <CoursesWidget courses={courses} />
          <DiscussionBoardWidget messages={messages} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-[40%,auto] mt-[30px] w-full gap-[30px]">
          <CalendarComponent />
          <AssignmentWidget courses={assignments} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
