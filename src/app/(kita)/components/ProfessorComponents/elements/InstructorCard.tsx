
import React from 'react'

const InstructorCard = () => {
    return (
        <div className='bg-white mb-[16px] group w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]'>
            <p className='text-[8px] font-medium text-lightGray group-hover:text-white leading-[9.75px]'>August 15, 2024</p>
            <p className='text-[12px] leading-[14px] font-medium my-[5px]'>Dr. John Doe</p>
            <p className='font-normal text-[10px] group-hover:text-white leading-[14px] mb-[10px]'>janesmith@university.edu</p>
            <p className='text-lightGray group-hover:text-white text-[10px] leading-[14px] font-normal'><span className='group-hover:text-white font-medium text-secondary'>Office Hours</span> Mondays & Wednesdays, 2:00 PM - 4:00 PM, Room 101</p>
        </div>
    )
}

export default InstructorCard