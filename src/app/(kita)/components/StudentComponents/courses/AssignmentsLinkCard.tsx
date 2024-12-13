

import React from 'react'
import Link from 'next/link'
const AssignmentsLinkCard = () => {
  return (
    <div className='custom-border mb-[16px] border rounded-[8px] custom-border p-[12px] w-[205px]'>
   <p className='text-secondary font-medium text-[12px] leading-[14px]'>Mathematics lll</p>
      <Link className='text-darkBlue text-[10px] leading-[14px] ' href="">
        View Assignment Details
      </Link>
      <p className='text-lightGray text-[8px] leading-[12px] mt-[5px]'>September 20, 2024</p>
    </div>
  )
}

export default AssignmentsLinkCard