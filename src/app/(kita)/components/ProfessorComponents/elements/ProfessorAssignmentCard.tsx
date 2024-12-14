import React from 'react'
import Image from 'next/image'
const ProfessorAssignmentCard = () => {
  return (
    <div className=' border border-[#0D6CFF14] rounded-[8px] mt-[16px] p-[10px]'>
    <div className='flex justify-between items-center'>
        <p className=' text-[10px] font-medium leading-[12px]'>Assignment 4: Answer Writing</p>
        <Image src="/dots2.svg" width={20} height={4} alt='' />
    </div>
    <div>
        <div className='mt-[5px] flex justify-between'>

            <div>


                <p className='font-medium text-[16px] leading-[19px]'>Medieval History</p>
                <ul className='text-[8px] leading-[12px] text-lightGray mt-[8px] font-normal'>
                    <li>Write a 5-page essay analyzing the key factors that led to.</li>
                    <li>Include at least three scholarly sources.</li>
                    <li>Follow the MLA format.</li>
                </ul>
            </div>

            <div>
                <span className='text-lightGray text-[8px] leading-[9px]'>Due Date:</span>
                <p className='font-medium text-[12px] leading-[24px]'>August 20, 2024</p>
            </div>
          
        </div>
        <button className='text-[#0B0B2C] mt-[10px] bg-[#EEEEEE] p-[5px] rounded-[4px] text-[8px] leading-[9px]'>Pending Grading</button>

    </div>

</div>
  )
}

export default ProfessorAssignmentCard