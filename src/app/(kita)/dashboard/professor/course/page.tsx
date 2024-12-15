
import DiscussionBoardWidget from '@/app/(kita)/components/DiscussionBoardWidget'
import Header from '@/app/(kita)/components/Header'
import Calendar from '@/app/(kita)/components/ProfessorComponents/Calendar'
import ProfessorAnnoucments from '@/app/(kita)/components/ProfessorComponents/ProfessorAnnoucments'
import ProfessorAssignments from '@/app/(kita)/components/ProfessorComponents/ProfessorAssignments'
import StudentsContacts from '@/app/(kita)/components/ProfessorComponents/StudentsContacts'
import Resources from '@/app/(kita)/components/StudentComponents/courses/Resources'
import React from 'react'
const assignmentsData = [
  {
    title: 'Assignment 4: Answer Writing',
    course: 'Medieval History',
    description: [
      'Write a 5-page essay analyzing the key factors that led to the Crusades.',
      'Include at least three scholarly sources.',
      'Follow the MLA format.',
    ],
    dueDate: 'August 20, 2024',
    status: 'Pending Grading',
  },
  {
    title: 'Assignment 5: Research Paper',
    course: 'Modern Art',
    description: [
      'Submit a 10-page research paper discussing the impact of Picasso on modern art.',
      'Cite at least five references.',
    ],
    dueDate: 'August 25, 2024',
    status: 'Pending Grading',
  },
];
const dummyMessages = [
  { id: 1, user: "Maya Thompson", message: "You: List the most recent or active discussion...", time: "12 Minutes" },
  { id: 2, user: "John Doe", message: "Discussing the new project proposal for Class 9.", time: "5 Minutes" },
  { id: 3, user: "Alice Johnson", message: "What are the assignment deadlines for this week?", time: "30 Minutes" },
];
const datesData = [
  { day: 'Mon', date: 16 },
  { day: 'Tue', date: 17 },
  { day: 'Wed', date: 18 },
  { day: 'Thur', date: 19 },
  { day: 'Fri', date: 20 },
  { day: 'Sat', date: 21 },
  { day: 'Sun', date: 22 },
];

const eventsData = [
  {
    time: '8:00PM',
    title: 'Medieval History',
    attendeesCount: 80,
    duration: '8:00 - 9:00',
    status: 'In Progress',
  },
  {
    time: '10:00AM',
    title: 'Modern Art',
    attendeesCount: 45,
    duration: '10:00 - 11:30',
    status: 'Upcoming',
  },
  {
    time: '2:00PM',
    title: 'Physics 101',
    attendeesCount: 60,
    duration: '2:00 - 3:30',
    status: 'Completed',
  },
];
const resourceData = [
  {
    date: 'Week 1: Aug 7, 2024',
    title: 'Introduction to Medieval History',
    downloadLink: '/slides/week1.pdf',
  },
  {
    date: 'Week 2: Aug 14, 2024',
    title: 'The Feudal System',
    downloadLink: '/slides/week2.pdf',
  },
  {
    date: 'Week 3: Aug 21, 2024',
    title: 'The Crusades',
    downloadLink: '/slides/week3.pdf',
  },
];
const announcementsData = [
  {
    date: 'August 15, 2024',
    professor: 'Dr. Emily Davis',
    description: 'The lecture on August 25 has been rescheduled to September 1.',
  },
  {
    date: 'August 18, 2024',
    professor: 'Prof. John Smith',
    description: 'Submit your assignments by August 20 to avoid penalties.',
  },
];

const examsData = [
  { date: 'August 25, 2024', details: 'Midterm Exam covering Chapters 1-5.' },
  { date: 'September 10, 2024', details: 'Final Exam covering all chapters.' },
];

const instructorsData = [
  {
    date: 'August 15, 2024',
    name: 'Prof. Jane Doe',
    email: 'jane.doe@university.edu',
    officeHours: 'Mondays & Wednesdays, 2:00 PM - 4:00 PM, Room 101',
  },
  {
    date: 'August 20, 2024',
    name: 'Prof. John Smith',
    email: 'john.smith@university.edu',
    officeHours: 'Tuesdays & Thursdays, 10:00 AM - 12:00 PM, Room 202',
  },
];
const studentsData = [
  { name: 'John Doe', performance: 'A-', grade: '90%' },
  { name: 'Jane Smith', performance: 'B+', grade: '85%' },
  { name: 'Emily Davis', performance: 'A', grade: '95%' },
  { name: 'Michael Brown', performance: 'B', grade: '80%' },
  { name: 'Sophia Johnson', performance: 'A-', grade: '88%' },
];
const dates = [
  { day: 'Mon', date: 16 },
  { day: 'Tue', date: 17 },
  { day: 'Wed', date: 18 },
  { day: 'Thu', date: 19 },
  { day: 'Fri', date: 20 },
  { day: 'Sat', date: 21 },
  { day: 'Sun', date: 22 },
];

const events = [
  { time: '8:00 AM', title: 'Team Meeting', attendeesCount: 10, duration: '8:00 - 9:00', status: 'Completed', date: 16 },
  { time: '8:00 AM', title: 'Team Meeting2', attendeesCount: 10, duration: '8:00 - 9:00', status: 'Completed', date: 16 },
  { time: '8:00 AM', title: 'Team Meeting3', attendeesCount: 10, duration: '8:00 - 9:00', status: 'Completed', date: 16 },
  { time: '10:00 AM', title: 'History Lecture', attendeesCount: 5, duration: '10:00 - 11:30', status: 'In Progress', date: 17 },
  { time: '10:00 AM', title: 'History Lecture2', attendeesCount: 5, duration: '10:00 - 11:30', status: 'In Progress', date: 17 },
  { time: '2:00 PM', title: 'Project Discussion', attendeesCount: 8, duration: '2:00 - 3:00', status: 'Pending', date: 17 },
  { time: '2:00 PM', title: 'Project Discussion2', attendeesCount: 8, duration: '2:00 - 3:00', status: 'Pending', date: 17 },
];
const page = () => {
  return (
    <div>
      <Header/>

      <div className='grid md:grid-cols-2 mt-[30px] gap-[30px]'>
      <ProfessorAnnoucments
        announcements={announcementsData}
        exams={examsData}
        instructors={instructorsData}
      />
        <ProfessorAssignments assignments={assignmentsData}/>
        <DiscussionBoardWidget messages={dummyMessages}/>
        <StudentsContacts students={studentsData} />
        <Calendar dates={dates} events={events} /> 
        <Resources resources={resourceData}/>
      </div>
    </div>
  )
}

export default page