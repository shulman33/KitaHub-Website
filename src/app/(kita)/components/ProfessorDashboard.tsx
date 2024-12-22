import React from "react";
import Header from "./Header";
import ActiveCourses from "./ProfessorComponents/ActiveCourses";
import ProfessorAssignments from "./ProfessorComponents/ProfessorAssignments";
import DiscussionBoardWidget from "./DiscussionBoardWidget";
import Calendar from "./ProfessorComponents/Calendar";
import { getMessagesByCurrentUser } from "../server/actions/messageActions";
import { getCurrentUserAssignment } from "../server/actions/assignmentActions";
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

const coursesData = [
  {
    courseName: "Medieval History",
    professor: "Prof. Jane Smith",
    date: "August 20, 2024",
    enrollmentCount: 80,
    assignmentsCount: 13,
    recentActivity: "Discussion posted on August 14, 2024",
  },
  {
    courseName: "Physics 101",
    professor: "Prof. John Doe",
    date: "August 18, 2024",
    enrollmentCount: 120,
    assignmentsCount: 10,
    recentActivity: "New assignment added on August 17, 2024",
  },
  {
    courseName: "Modern Art",
    professor: "Prof. Emily Davis",
    date: "August 15, 2024",
    enrollmentCount: 45,
    assignmentsCount: 8,
    recentActivity: "Lecture slides updated on August 14, 2024",
  },
];
const assignmentsData = [
  {
    title: "Assignment 4: Answer Writing",
    course: "Medieval History",
    description: [
      "Write a 5-page essay analyzing the key factors that led to the Crusades.",
      "Include at least three scholarly sources.",
      "Follow the MLA format.",
    ],
    dueDate: "August 20, 2024",
    status: "Pending Grading",
  },
  {
    title: "Assignment 5: Research Paper",
    course: "Modern Art",
    description: [
      "Submit a 10-page research paper discussing the impact of Picasso on modern art.",
      "Cite at least five references.",
    ],
    dueDate: "August 25, 2024",
    status: "Pending Grading",
  },
];

const dates = [
  { day: "Mon", date: 16 },
  { day: "Tue", date: 17 },
  { day: "Wed", date: 18 },
  { day: "Thu", date: 19 },
  { day: "Fri", date: 20 },
  { day: "Sat", date: 21 },
  { day: "Sun", date: 22 },
];

const events = [
  {
    time: "8:00 AM",
    title: "Team Meeting",
    attendeesCount: 10,
    duration: "8:00 - 9:00",
    status: "Completed",
    date: 16,
  },
  {
    time: "8:00 AM",
    title: "Team Meeting2",
    attendeesCount: 10,
    duration: "8:00 - 9:00",
    status: "Completed",
    date: 16,
  },
  {
    time: "8:00 AM",
    title: "Team Meeting3",
    attendeesCount: 10,
    duration: "8:00 - 9:00",
    status: "Completed",
    date: 16,
  },
  {
    time: "10:00 AM",
    title: "History Lecture",
    attendeesCount: 5,
    duration: "10:00 - 11:30",
    status: "In Progress",
    date: 17,
  },
  {
    time: "10:00 AM",
    title: "History Lecture2",
    attendeesCount: 5,
    duration: "10:00 - 11:30",
    status: "In Progress",
    date: 17,
  },
  {
    time: "2:00 PM",
    title: "Project Discussion",
    attendeesCount: 8,
    duration: "2:00 - 3:00",
    status: "Pending",
    date: 17,
  },
  {
    time: "2:00 PM",
    title: "Project Discussion2",
    attendeesCount: 8,
    duration: "2:00 - 3:00",
    status: "Pending",
    date: 17,
  },
];
interface ProfessorDashboardProps {
  name: string;
}
const ProfessorDashboard = async ({name}: ProfessorDashboardProps) => {
  const messages = await getMessagesByCurrentUser();
  const assignments = await getCurrentUserAssignment();
  return (
    <div>
      <Header name={name}/>
      <div className="grid md:grid-cols-2 mt-[30px] gap-[30px]">
        <ActiveCourses courses={coursesData} />
        <ProfessorAssignments assignments={assignments} />
        <Calendar dates={dates} events={events} />

        <DiscussionBoardWidget messages={messages} />
      </div>
    </div>
  );
};

export default ProfessorDashboard;
