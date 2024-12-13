
import Image from 'next/image'
import React from 'react'
import AnnoucementCard from './AnnoucementCard'

const Annoucemnets = () => {
    return (
        <div className='bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto'>
            <div className="flex justify-between items-center">
                <p className='text-[16px] leading-[19.5px] font-bold'>📢 Annoucements</p>
                <button className='text-[14px] leading-[17px] text-[#74759A] font-semibold'>View All</button>
            </div>

            <div className='flex gap-[16px] oveflow-x-scroll'>


                <div className='bg-white p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Sechedule Changes</p>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                </div>
                <div className='bg-white flex-shrink-0 p-[8px] mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Upcoming Events</p>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                </div>
                <div className='bg-white p-[8px] flex-shrink-0 mt-[16px] w-fit flex flex-col overflow-y-auto rounded-[8px] border border-[#0D6CFF14]'>
                    <p className='text-[14px]   flex-shrink-0 font-medium text-lightGray pb-[8px] border-b mb-[16px]  border-[#0D6CFF14] leading-[17px]'>Assignments</p>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                      <AnnoucementCard/>
                </div>

            </div>
        </div>
    )
}

export default Annoucemnets