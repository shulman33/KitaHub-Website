

import React from 'react'
import Counter from './Counter'
const AssigmentRow = () => {
  return (
    <div className=' flex my-[16px] shadow-md rounded-[8px] justify-between text-[14px] font-medium  rounded=[8px] leading-[19.5px] grid-cols-4  border-b-[1px] border-[#2165FF]/8 py-[8px] items-center p-[10px]   text-secondary '>
    
       
    {/*   Course  */}
            <p className='text-[16px] font-medium leading-[19.5px] '>
            Assigments
            </p>
            <p className=' '>Answer Writing</p>
            <Counter/>
            <p>In Progress</p>
          </div>
  )
}

export default AssigmentRow