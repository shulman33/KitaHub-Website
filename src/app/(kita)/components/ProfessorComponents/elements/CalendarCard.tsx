

import React from 'react'
import Image from 'next/image'
const CalendarCard = () => {
    return (
        <div>
            <div className='flex gap-3 items-center'>
                <p className='font-medium text-[16px] leading-[19px]'>8:00PM</p>
                <div className='h-[1px] bg-[#0D6CFF14] w-full'></div>
            </div>
            <div className='bg-lightBlue ml-[54px] rounded-[8px] my-[16px] p-[16px]'>

                <div className='flex justify-between'>
                    <p className='text-[16px] leading-[19px] font-medium'>Medieval History</p>
                    <div className='flex gap-2 items-center'>
                        <Image src="/peoples.svg" width={40} height={10} alt='no image' />
                        <p className='text-[8px] leading-[9.75px] font-medium'>+80 More</p>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-[12px]'>
                    <p className='text-[16px] leading-[19px] font-medium'>8:00 - 9:00</p>
                    <button className='bg-[#0D6CFF] text-[12px] leading-[14px] rounded-[4px] p-[10px] text-white'>In Progress</button>
                </div>
            </div>
        </div>
    )
}

export default CalendarCard