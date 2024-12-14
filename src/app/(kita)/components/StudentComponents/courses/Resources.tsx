<<<<<<< HEAD


import Image from 'next/image'
import React from 'react'

const Resources = () => {
    return (
        <div className="p-[24px] rounded-[16px] bg-white">
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

           <div className='flex flex-col max-h-[220px] overflow-y-auto'>

           
            <div className='flex justify-between items-center mt-[24px]'>
                <div className='text-secondary'>
                    <p className='text-[14px] font-semibold leading-[22px]'>Week 1: Aug 7, 2024</p>
                    <p className='text-[14px] leading-[22px] font-normal'>Introduction to Medieval History.</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <Image src="/download.svg" width={20} height={20} alt=' no image'/>
                    <p className='text-[14px]  text-[#0D6CFF] font-medium leading-[17px]'>Download Slides</p>
                </div>
            </div>
            <div className='flex justify-between items-center mt-[24px]'>
                <div className='text-secondary'>
                    <p className='text-[14px] font-semibold leading-[22px]'>Week 1: Aug 7, 2024</p>
                    <p className='text-[14px] leading-[22px] font-normal'>Introduction to Medieval History.</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <Image src="/download.svg" width={20} height={20} alt=' no image'/>
                    <p className='text-[14px]  text-[#0D6CFF] font-medium leading-[17px]'>Download Slides</p>
                </div>
            </div>
            <div className='flex justify-between items-center mt-[24px]'>
                <div className='text-secondary'>
                    <p className='text-[14px] font-semibold leading-[22px]'>Week 1: Aug 7, 2024</p>
                    <p className='text-[14px] leading-[22px] font-normal'>Introduction to Medieval History.</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <Image src="/download.svg" width={20} height={20} alt=' no image'/>
                    <p className='text-[14px]  text-[#0D6CFF] font-medium leading-[17px]'>Download Slides</p>
                </div>
            </div>
            </div>

            <p className='text-[10px] leading-[12px] mt-[30px]'> <span className='font-semibold'>Note:</span> Be sure to regularly check this section for updates and newly added materials to support your studies.</p>
        </div>
    )
}

=======


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

>>>>>>> 17e58c277143578bc44b3b7cd8d75b6ea97232ca
export default Resources