import Image from 'next/image'
import React from 'react'

const ProfessorInfoCard = () => {
    return (
        <div className=' mt-[20px]'>
            <div className='flex items-center justify-between mb-[14px]'>
                <p className='font-bold text-[20px] leading-[24px]'>Medieval History</p>
                <Image src="/dots2.svg" width={20} height={4} alt='' />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-medium text-[16px] leading-[19px]'>Prof. Jane Smith</p>
                <p className='text-[12px] leading-[24px] font-medium text-lightGray'>August 20, 2024</p>
            </div>
            <div className='text-lightGray flex justify-between items-center font-medium text-[12px] leading-[14px]'>
                <div className='flex items-center gap-1 mt-[16px] mb-[11px]' >
                    <p >Enrollment:</p>
                    <div className='flex gap-2 items-center'>
                        <Image src="/peoples.svg" width={40} height={10} alt='no image' />
                        <p className='text-[8px] leading-[9.75px] font-medium '>+80 More</p>
                    </div>
                </div>
                <p>Assignments: 13</p>
            </div>
            <p className='text-lightGray text-[12px] leading-[14px] font-medium'>Recent Activity: Discussion posted on August 14, 2024</p>
        </div>
    )
}

export default ProfessorInfoCard