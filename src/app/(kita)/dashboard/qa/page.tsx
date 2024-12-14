import Image from 'next/image'
import React from 'react'
import Question from '../../components/QAComponents/Question'
import InstructorQuestion from '../../components/QAComponents/InstructorQuestion'
import Answers from '../../components/QAComponents/Answers'

const page = () => {
  return (
    <div className='grid grid-cols-[40%,auto] gap-[30px]'>

   
    <div className='bg-white max-h-screen overflow-y-auto'>
        <div className='bg-white pl-[21px] pb-[21px] pt-[24px] pr-[24px] border-b border-[#0D6CFF14]'>
            <div className='border  p-[9px] rounded-[4px] flex justify-between items-center border-[#0D6CFF14]'>
                <input type='text' className='w-full text-black' placeholder='Enter here'  />
                <div className='bg-darkBlue w-fit p-[9px] rounded-[4px]'>

                
                <Image src="/search2.svg" width={24} height={24} alt='search'/>
                </div>
            </div>
            <div className='flex justify-end gap-2 mt-[21px] items-center'>
                <Image src="/filter.svg" width={20} height={20} alt='filters'/>
                <p className='text-[16px] font-bold leading-[19px]'>Filter</p>
            </div>
        </div>
        {/* Pinned */}
        <div>
            <div className='flex items-center mb-[16px] pl-[24px] gap-2 mt-[24px]'>
                <Image src="/pin.svg" width={16} height={16} alt='no image'/>
                <p className='text-[16px] leading-[21px] font-bold text-secondary'>Pinned</p>
            </div>
            <Question/>
            

        </div>
        <div>
            <div className='flex items-center mb-[16px] pl-[24px] gap-2 mt-[24px]'>
                <p className='text-[16px] leading-[21px] font-bold text-secondary'>This Week</p>
            </div>
            <Question/>
            <Question/>
            <Question/>
            <Question/>


        </div>
    </div>
    <div className='max-h-screen overflow-y-auto'>
        <InstructorQuestion/>

{/* Answers */}
        <div className='mt-[50px]'>
         <p className='text-secondary border-t border-[#0D6CFF14] pt-[30px] font-semibold text-[16px] leading-[19px]'>5 Answers</p>
           
           <div className=''>
            <Answers/>
            <div className='ml-[110px]'>
            <Answers/>
            </div>
            <Answers/>
           </div>
        </div>
    </div>
    </div>
  )
}

export default page