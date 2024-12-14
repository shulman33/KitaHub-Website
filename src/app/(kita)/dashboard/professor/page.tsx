
import React from 'react'
import Header from '../../components/Header'
import ActiveCourses from '../../components/ProfessorComponents/ActiveCourses'
import ProfessorAssignments from '../../components/ProfessorComponents/ProfessorAssignments'
import DiscussionBoardWidget from '../../components/DiscussionBoardWidget'
import Calendar from '../../components/ProfessorComponents/Calendar'

const page = () => {
  return (
    <div>
       <Header/>
       <div className='grid grid-cols-2 mt-[30px] gap-[30px]'>

        <ActiveCourses/>
        <ProfessorAssignments/>
        <Calendar/>
 
         <DiscussionBoardWidget/>
       </div>
    </div>
  )
}

export default page