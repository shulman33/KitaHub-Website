

import React from 'react'
import DropdownMenu from '../StudentComponents/DropDown'
import Image from 'next/image'
import ProfessorAssignmentCard from './elements/ProfessorAssignmentCard'
const ProfessorAssignments = () => {
    return (
        <div className="p-[24px]  max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
            <div className="flex justify-between mb-[16px] items-center">
                <div className="text-secondary text-[16px] leading-[19px] font-bold">
                    <p className="text-[14px]  leading-[19px] font-bold  ">🗂️ Assignments</p>
                </div>
                <div>
                    <p className="text-[#74759A] text-[14px] ">+ New Assignment</p>
                </div>

            </div>

            <div className='text-lightGray flex justify-between items-center text-[14px] leading-[17px]'>
                <p className=''>Pending Submission</p>
                <div className='flex items-center justify-center gap-1'>

                    <p>Sort By:</p>

                    <DropdownMenu />
                </div>
            </div>

           <ProfessorAssignmentCard/>
           <ProfessorAssignmentCard/>
           <ProfessorAssignmentCard/>
           <ProfessorAssignmentCard/>
        </div>
    )
}

export default ProfessorAssignments