<<<<<<< HEAD
import React from 'react'
import Image from 'next/image'
import AnnoucementCard from './AnnoucementCard'
import UpcomingAssignmentCard from './UpcomingAssignmentCard'
import PastAssignmentsCard from './PastAssignmentsCard'
import AssignmentsLinkCard from './AssignmentsLinkCard'
const Assigments = () => {
  return (
    
    <div className='bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto'>
            <div className="flex justify-between items-center">
                <p className='text-[16px] leading-[19.5px] font-bold'>🗂️ Assignments</p>
                <button className='text-[14px] leading-[17px] text-[#74759A] font-semibold'>View All</button>
            </div>

            <div className='flex gap-[16px] oveflow-x-scroll'>


                <div className='bg-white  p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Upcoming Assignments</p>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                </div>
                <div className='bg-white flex-shrink-0 p-[8px] mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Past Assignments</p>
                     <PastAssignmentsCard/>
                     <PastAssignmentsCard/>
                     <PastAssignmentsCard/>
                </div>
                <div className='bg-white p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Assignments Link</p>
                    <AssignmentsLinkCard/>
                    <AssignmentsLinkCard/>
                    <AssignmentsLinkCard/>
                </div>

            </div>
        </div>
  )
}

=======
import React from 'react'
import Image from 'next/image'
import AnnoucementCard from './AnnoucementCard'
import UpcomingAssignmentCard from './UpcomingAssignmentCard'
import PastAssignmentsCard from './PastAssignmentsCard'
import AssignmentsLinkCard from './AssignmentsLinkCard'
const Assigments = () => {
  return (
    
    <div className='bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto'>
            <div className="flex justify-between items-center">
                <p className='text-[16px] leading-[19.5px] font-bold'>🗂️ Assignments</p>
                <button className='text-[14px] leading-[17px] text-[#74759A] font-semibold'>View All</button>
            </div>

            <div className='flex gap-[16px] oveflow-x-scroll'>


                <div className='bg-white  p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Upcoming Assignments</p>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                     <UpcomingAssignmentCard/>
                </div>
                <div className='bg-white flex-shrink-0 p-[8px] mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Past Assignments</p>
                     <PastAssignmentsCard/>
                     <PastAssignmentsCard/>
                     <PastAssignmentsCard/>
                </div>
                <div className='bg-white p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Assignments Link</p>
                    <AssignmentsLinkCard/>
                    <AssignmentsLinkCard/>
                    <AssignmentsLinkCard/>
                </div>

            </div>
        </div>
  )
}

>>>>>>> 17e58c277143578bc44b3b7cd8d75b6ea97232ca
export default Assigments