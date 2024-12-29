import React from "react";
import Header from "../Header";
import DiscussionCard from "./DiscussionCard";
import DiscussionBoardWidget from "../DiscussionBoardWidget";
// import Assignments from "./courses/Assignments";
import Resources from "./courses/Resources";
import InstructorInformation from "./courses/InstructorInformation";
import Announcements from "./courses/Announcements";
import { ExtendedClass, ExtendedSelectMessage } from "../../lib/types";
import { getMessagesByClassId } from "../../server/actions/messageActions";
import { getAssignmentsByClassId } from "../../server/actions/assignmentActions";
import { getInstructorsByClassId } from "../../server/actions/classActions";
const dummyMessages = [
  {
    id: 1,
    user: "Maya Thompson",
    message: "You: List the most recent or active discussion...",
    time: "12 Minutes",
  },
  {
    id: 2,
    user: "John Doe",
    message: "Discussing the new project proposal for Class 9.",
    time: "5 Minutes",
  },
  {
    id: 3,
    user: "Alice Johnson",
    message: "What are the assignment deadlines for this week?",
    time: "30 Minutes",
  },
];
interface Announcement {
  date: string;
  professor: string;
  description: string;
}

interface Category {
  title: string;
  announcements: Announcement[];
}

const categoriesData: Category[] = [
  // {
  //   title: "Schedule Changes",
  //   announcements: [
  //     {
  //       date: "August 15, 2024",
  //       professor: "Prof. Emily Davis",
  //       description:
  //         "The lecture scheduled for August 25 has been canceled due to a departmental meeting.",
  //     },
  //     {
  //       date: "August 20, 2024",
  //       professor: "Prof. John Smith",
  //       description: "Class rescheduled to September 1.",
  //     },
  //   ],
  // },
  // {
  //   title: "Upcoming Events",
  //   announcements: [
  //     {
  //       date: "August 18, 2024",
  //       professor: "Prof. Sarah Johnson",
  //       description: "Join the upcoming webinar on AI advancements.",
  //     },
  //   ],
  // },
  // {
  //   title: "Assignments",
  //   announcements: [
  //     {
  //       date: "August 25, 2024",
  //       professor: "Prof. Michael Lee",
  //       description: "Submit your final project before the deadline.",
  //     },
  //     {
  //       date: "August 28, 2024",
  //       professor: "Prof. Olivia Brown",
  //       description: "Essay submissions are due by the end of the week.",
  //     },
  //   ],
  // },
];
const assignmentsData = [
  {
    date: "August 25, 2024",
    status: "Submitted",
    subject: "Mathematics III",
    type: "upcoming",
  },
  {
    date: "August 25, 2024",
    status: "Submitted",
    subject: "Mathematics III",
    type: "upcoming",
  },
  {
    date: "August 25, 2024",
    status: "Submitted",
    subject: "Mathematics III",
    type: "upcoming",
  },
  {
    date: "August 15, 2024",
    grade: "85%",
    subject: "Physics II",
    feedback: "Great improvement on your essay!",
    type: "past",
  },
  {
    date: "August 15, 2024",
    grade: "85%",
    subject: "Physics II",
    feedback: "Great improvement on your essay!",
    type: "past",
  },
  {
    date: "August 15, 2024",
    grade: "85%",
    subject: "Physics II",
    feedback: "Great improvement on your essay!",
    type: "past",
  },
  {
    date: "September 20, 2024",
    subject: "History Project",
    type: "link",
  },
  {
    date: "September 20, 2024",
    subject: "History Project",
    type: "link",
  },
  {
    date: "September 20, 2024",
    subject: "History Project",
    type: "link",
  },
];
interface Resource {
  date: string;
  title: string;
  downloadLink: string;
}

const resourceData: Resource[] = [
  // {
  //   date: "Week 1: Aug 7, 2024",
  //   title: "Introduction to Medieval History",
  //   downloadLink: "/slides/week1.pdf",
  // },
  // {
  //   date: "Week 2: Aug 14, 2024",
  //   title: "The Feudal System",
  //   downloadLink: "/slides/week2.pdf",
  // },
  // {
  //   date: "Week 3: Aug 21, 2024",
  //   title: "The Crusades",
  //   downloadLink: "/slides/week3.pdf",
  // },
];

interface StudentClassDashboardProps {
  classData: ExtendedClass;
  name: string;
}

export default async function StudentClassDashboard({
  classData,
  name,
}: StudentClassDashboardProps) {
  const assignments = await getAssignmentsByClassId(classData.id);
  const messages = await getMessagesByClassId(classData.id);
  const instructors = await getInstructorsByClassId(classData.id);
  return (
    <>
      <div className="grid  md:grid-cols-2 lg:grid-cols-[60%,auto] gap-[30px]">
        <Header name={name} />
        <InstructorInformation instructors={instructors} />
      </div>

      {/* Dsicussion and Annoucements  */}

      <div className="grid gap-[30px] mt-[30px] md:grid-cols-2">
        <DiscussionBoardWidget messages={messages} />
        <Announcements categories={categoriesData} />
        {/* <Assignments assignments={assignments} /> */}
        <DiscussionBoardWidget messages={messages} />
        <Resources resources={resourceData} />
      </div>
    </>
  );
};

