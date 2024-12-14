

import React from 'react'
import Image from 'next/image'
const InstructorInformation = () => {
    return (
        <div className='bg-white p-[16px] rounded-[16px] max-h-[240px] overflow-y-auto'>
            
            <div className='flex pb-[8px] border-[#0D6CFF14] border-b gap-[4px] items-center'>
           <Image src="/info.svg" width={16} height={16} alt='info'/>
            <p className='font-bold text-[16px] leading-[19px] '>Instructor’s Information</p>
            </div>
            <div className='flex flex-col gap-[16px] mt-[24px]'>
                <div className='flex justify-between pb-[8px] border-[#0D6CFF14] border-b items-center'>
                    <div className='flex gap-2  items-center'>
                        <Image src="/avatar.svg" width={46} height={46} alt='logo' />
                        <div className='flex flex-col'>
                            <h1 className='text-[16px] font-semibold leading-[19.5px]'>Dr. Jane Doe</h1>
                            <p className='text-[8px] mt-[4px] leading-[9px]'>Instructor of USA Government University </p>
                        </div>
                    </div>
                    <div className='gap-[4px] flex  flex-col'>
                        <div className='flex items-center gap-1'>
                            <Image src="/call.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Image src="/message.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>


                <div className='flex justify-between pb-[8px] border-[#0D6CFF14] border-b items-center'>
                    <div className='flex gap-2  items-center'>
                        <Image src="/avatar.svg" width={46} height={46} alt='logo' />
                        <div className='flex flex-col'>
                            <h1 className='text-[16px] font-semibold leading-[19.5px]'>Dr. Jane Doe</h1>
                            <p className='text-[8px] mt-[4px] leading-[9px]'>Instructor of USA Government University </p>
                        </div>
                    </div>
                    <div className='gap-[4px] flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <Image src="/call.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Image src="/message.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between pb-[8px] border-[#0D6CFF14] border-b  items-center'>
                    <div className='flex gap-2  items-center'>
                        <Image src="/avatar.svg" width={46} height={46} alt='logo' />
                        <div className='flex flex-col'>
                            <h1 className='text-[16px] font-semibold leading-[19.5px]'>Dr. Jane Doe</h1>
                            <p className='text-[8px] mt-[4px] leading-[9px]'>Instructor of USA Government University </p>
                        </div>
                    </div>
                    <div className='gap-[4px] flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <Image src="/call.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Image src="/message.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between border-[#0D6CFF14] pb-[8px] border-b items-center'>
                    <div className='flex gap-2 items-center'>
                        <Image src="/avatar.svg" width={46} height={46} alt='logo' />
                        <div className='flex flex-col'>
                            <h1 className='text-[16px] font-semibold leading-[19.5px]'>Dr. Jane Doe</h1>
                            <p className='text-[8px] mt-[4px] leading-[9px]'>Instructor of USA Government University </p>
                        </div>
                    </div>
                    <div className='gap-[4px] flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <Image src="/call.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Image src="/message.svg" width={12} height={12} alt='call' />
                            <p className='text-[10px] leading-[12px] font-medium'>+1 (123) 456-7890</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default InstructorInformation