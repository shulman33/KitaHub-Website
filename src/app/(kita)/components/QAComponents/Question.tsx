

import Image from 'next/image'
import React from 'react'

const Question = () => {
    return (
        <div className='p-[24px] border-t border-[#0D6CFF14]'>
            <div className='mb-[10px] flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Image src="/ques.svg" width={20} height={20} alt='info'/>
                <p className=' font-semibold text-[20px] leading-[24px]'>Medieval History.</p>
                </div>
                <Image src="/pin.svg" width={16} height={16} alt='pinned'/>
               
            </div>
            <p className='text-lightGray text-[10px] leading-[14px] mb-[10px]'>This expedient serves to get an idea of the finished product that will soon be printed or disseminated via digital channels. In order to have a result that is...</p>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[10px]'>
                    <p className='bg-lightBlue text-[12px] rounded-[4px] text-darkBlue py-[5px] px-[10px]'>General</p>
                    <p className='bg-lightBlue text-[12px] rounded-[4px] text-lightGray py-[5px] px-[10px]'>Scott Maxwell</p>
                    <p className='bg-lightBlue text-[12px] rounded-[4px] text-lightGray py-[5px] px-[10px]'>4h</p>
                </div>
                <div className='flex items-center text-[10px] gap-3'>
                    <div className='flex gap-2'>
                        <span>8</span>
                        <Image src="/mIcon.svg" width={12} height={11} alt='' />
                    </div>
                    <div className='flex gap-2'>
                        <span>8</span>
                        <Image src="/heart.svg" width={12} height={11} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question