
import DiscussionBoardWidget from '@/app/(kita)/components/DiscussionBoardWidget'
import Header from '@/app/(kita)/components/Header'
import Calendar from '@/app/(kita)/components/ProfessorComponents/Calendar'
import ProfessorAnnoucments from '@/app/(kita)/components/ProfessorComponents/ProfessorAnnoucments'
import ProfessorAssignments from '@/app/(kita)/components/ProfessorComponents/ProfessorAssignments'
import StudentsContacts from '@/app/(kita)/components/ProfessorComponents/StudentsContacts'
import Resources from '@/app/(kita)/components/StudentComponents/courses/Resources'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>

      <div className='grid grid-cols-2 mt-[30px] gap-[30px]'>
        <ProfessorAnnoucments/>
        <ProfessorAssignments/>
        <DiscussionBoardWidget/>
        <StudentsContacts/>
        <Calendar/>
        <Resources/>
      </div>
    </div>
  )
}

export default page