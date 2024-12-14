<<<<<<< HEAD


import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const UpcomingAssignmentCard = () => {
  return (
    <div className='custom-border mb-[16px] border rounded-[8px] custom-border p-[12px] w-[205px]'>
      <div className='flex  justify-between'>
        <p className='text-[8px] text-lightGrayleading-[9px]'>August 25, 2024</p>
        <button className='bg-[#23B038] rounded-[4px] text-[8px] text-white p-[5px]'>Submitted</button>
      </div>
      <p className='text-secondary font-medium text-[12px] leading-[14px]'>Mathematics lll</p>
      <Link className='text-darkBlue text-[10px] leading-[14px] ' href="">
        View Assignment Details
      </Link>
      <div className='flex gap-2 mt-[5px] items-center'>
        <Image src="/peoples.svg" width={40} height={10} alt='no image' />
        <p className='text-[8px] leading-[9.75px] font-medium mt-[8px]'>+80 More</p>
      </div>
    </div>
  )
}

=======


import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const UpcomingAssignmentCard = () => {
  return (
    <div className='custom-border mb-[16px] border rounded-[8px] custom-border p-[12px] w-[205px]'>
      <div className='flex  justify-between'>
        <p className='text-[8px] text-lightGrayleading-[9px]'>August 25, 2024</p>
        <button className='bg-[#23B038] rounded-[4px] text-[8px] text-white p-[5px]'>Submitted</button>
      </div>
      <p className='text-secondary font-medium text-[12px] leading-[14px]'>Mathematics lll</p>
      <Link className='text-darkBlue text-[10px] leading-[14px] ' href="">
        View Assignment Details
      </Link>
      <div className='flex gap-2 mt-[5px] items-center'>
        <Image src="/peoples.svg" width={40} height={10} alt='no image' />
        <p className='text-[8px] leading-[9.75px] font-medium mt-[8px]'>+80 More</p>
      </div>
    </div>
  )
}

>>>>>>> 17e58c277143578bc44b3b7cd8d75b6ea97232ca
export default UpcomingAssignmentCard