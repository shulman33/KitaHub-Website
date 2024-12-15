
import React from 'react'
import Header from '../../components/Header'
import DiscussionCard from '../../components/StudentComponents/DiscussionCard'
import DiscussionBoardWidget from '../../components/DiscussionBoardWidget'
import Assignments from '../../components/StudentComponents/courses/Assignments'
import Resources from '../../components/StudentComponents/courses/Resources'
import InstructorInformation from '../../components/StudentComponents/courses/InstructorInformation'
import Announcements from '../../components/StudentComponents/courses/Announcements'
const dummyMessages = [
  { id: 1, user: "Maya Thompson", message: "You: List the most recent or active discussion...", time: "12 Minutes" },
  { id: 2, user: "John Doe", message: "Discussing the new project proposal for Class 9.", time: "5 Minutes" },
  { id: 3, user: "Alice Johnson", message: "What are the assignment deadlines for this week?", time: "30 Minutes" },
];
const categoriesData = [
  {
    title: 'Schedule Changes',
    announcements: [
      {
        date: 'August 15, 2024',
        professor: 'Prof. Emily Davis',
        description:
          'The lecture scheduled for August 25 has been canceled due to a departmental meeting.',
      },
      {
        date: 'August 20, 2024',
        professor: 'Prof. John Smith',
        description: 'Class rescheduled to September 1.',
      },
    ],
  },
  {
    title: 'Upcoming Events',
    announcements: [
      {
        date: 'August 18, 2024',
        professor: 'Prof. Sarah Johnson',
        description: 'Join the upcoming webinar on AI advancements.',
      },
    ],
  },
  {
    title: 'Assignments',
    announcements: [
      {
        date: 'August 25, 2024',
        professor: 'Prof. Michael Lee',
        description: 'Submit your final project before the deadline.',
      },
      {
        date: 'August 28, 2024',
        professor: 'Prof. Olivia Brown',
        description: 'Essay submissions are due by the end of the week.',
      },
    ],
  },
];
const assignmentsData = [
  {
    date: 'August 25, 2024',
    status: 'Submitted',
    subject: 'Mathematics III',
    type: 'upcoming',
  },
  {
    date: 'August 25, 2024',
    status: 'Submitted',
    subject: 'Mathematics III',
    type: 'upcoming',
  },
  {
    date: 'August 25, 2024',
    status: 'Submitted',
    subject: 'Mathematics III',
    type: 'upcoming',
  },
  {
    date: 'August 15, 2024',
    grade: '85%',
    subject: 'Physics II',
    feedback: 'Great improvement on your essay!',
    type: 'past',
  },
  {
    date: 'August 15, 2024',
    grade: '85%',
    subject: 'Physics II',
    feedback: 'Great improvement on your essay!',
    type: 'past',
  },
  {
    date: 'August 15, 2024',
    grade: '85%',
    subject: 'Physics II',
    feedback: 'Great improvement on your essay!',
    type: 'past',
  },
  {
    date: 'September 20, 2024',
    subject: 'History Project',
    type: 'link',
  },
  {
    date: 'September 20, 2024',
    subject: 'History Project',
    type: 'link',
  },
  {
    date: 'September 20, 2024',
    subject: 'History Project',
    type: 'link',
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
const instructorData = [
  {
    name: 'Dr. Jane Doe',
    university: 'USA Government University',
    phone: '+1 (123) 456-7890',
    email: 'jane.doe@university.edu',
  },
  {
    name: 'Dr. John Smith',
    university: 'Harvard University',
    phone: '+1 (987) 654-3210',
    email: 'john.smith@harvard.edu',
  },
  {
    name: 'Dr. Emily Davis',
    university: 'Stanford University',
    phone: '+1 (456) 789-0123',
    email: 'emily.davis@stanford.edu',
  },
];

const page = () => {
  return (
   <>

   <div className='grid  md:grid-cols-2 lg:grid-cols-[60%,auto] gap-[30px]'>
   <Header/>
   <InstructorInformation instructors={instructorData} />
   </div>
 
    
 {/* Dsicussion and Annoucements  */}

<div className='grid gap-[30px] mt-[30px] md:grid-cols-2'>
  
<DiscussionBoardWidget messages={dummyMessages}/>
<Announcements categories={categoriesData} />
<Assignments assignments={assignmentsData} />
<Resources resources={resourceData} />
</div>
</> 
    
  )
}

export default page