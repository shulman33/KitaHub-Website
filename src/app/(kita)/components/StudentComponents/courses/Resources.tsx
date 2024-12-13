

import React from 'react'

const Resources = () => {
    return (
        <div className="p-[24px] max-h-[378px] overflow-y-auto bg-white">
            <div className="flex justify-between  items-center">
                <div className="text-secondary text-[16px] leading-[19px] font-bold">
                    <p className="text-[14px]  leading-[19px] font-bold  ">Resources</p>
                </div>
                <div>
                    <p className="text-[#74759A] text-[14px] ">+ New Discussion</p>
                </div>

            </div>
            <div className='flex mt-[22px] pb-[8px] justify-between border-b border-[#0D6CFF14/8] items-center'>
           
            <p className='text-darkBlue'>Lecture Slides</p>
            <p className='text-lightGray'>Materials</p>
            </div>

            <div>
                <div className='text-secondary'>
                    <p className=''>Week 1: Aug 7, 2024</p>
                    <p className='text-[14px] leading-[22px] font-normal'>Introduction to Medieval History.</p>
                </div>
            </div>
        </div>
    )
}

export default Resources