

import React from 'react'
import Counter from './Counter'
const CourseRow = () => {
  return (
    <div className=' flex border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px] justify-between items-center text-[16px] text-secondary leading-[19.5px]'>
    
       
    {/*   Course  */}
            <p className='text-[16px] flex-shrink-0'>
            🗂️ Mathematics lll
            </p>
            <p className='flex-shrink-0'>Answer Writing</p>
            <Counter/>
    
          </div>
  )
}

export default CourseRow