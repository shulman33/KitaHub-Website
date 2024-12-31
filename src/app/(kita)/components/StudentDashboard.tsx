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
import { getSession } from "@auth0/nextjs-auth0";

interface StudentDashboardProps {
  name: string;
  isStudent: boolean;
  authUserId: string;
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

// universityId 1e3d0e31-0299-4543-a8f3-2d969b9bccd5
// userId 0e5df738-4658-45bd-b526-a0384df34b53
// classId 2801f9a3-da61-426a-8fc7-0d0d5e50960c


const StudentDashboard = async ({ name, isStudent, authUserId }: StudentDashboardProps) => {
  const messages = await getMessagesByCurrentUser(authUserId);
  // console.log("messages", messages);
  const courses = await getClassesForCurrentUser(authUserId);
  // console.log("courses", courses);
  const assignments = await getCurrentUserAssignment(authUserId);
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { sub } = session.user;
  console.log("user id", sub);
  return (
    <>
      <Header name={name} />
      <div className=" py-16">
        <div className="grid md:grid-cols-2 gap-[30px]">
          {/* <AssignmentWidget courses={dummyAssignments} /> */}
          <CoursesWidget courses={courses} isStudent={isStudent} auth0UserId={sub} />
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
