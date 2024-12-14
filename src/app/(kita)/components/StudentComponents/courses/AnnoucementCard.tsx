<<<<<<< HEAD
import React from 'react'
import Image from 'next/image'
const AnnoucementCard = () => {
  return (
    
    <div className='bg-white mb-[16px] w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]'>
    <p className='text-[8px] font-medium leading-[9.75px]'>August 15, 2024</p>
    <h1 className='text-[12px] leading-[14.63px] font-medium mt-[5px]'>Prof. Emily Davis</h1>
    <p className='text-[10px] leading-[14px] font-normal line-clamp-3 mt-[10px]'>The lecture scheduled for August 25 has been canceled due to a departmental meeting. A makeup class will be held on September 1 at the usual time and venue.</p>
 
  <p className='text-darkBlue text-[10px] leading-[14px] font-normal mt-[2px]'>Read more</p> 
  <div className='flex gap-2 items-center'>
      <Image src="/peoples.svg" width={40} height={10} alt='no image'/>
      <p className='text-[8px] leading-[9.75px] font-medium mt-[8px]'>+80 More</p>
  </div>
  </div>   
  )
}

=======
import React from 'react'
import Image from 'next/image'
const AnnoucementCard = () => {
  return (
    
    <div className='bg-white w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]'>
    <p className='text-[8px] font-medium leading-[9.75px]'>August 15, 2024</p>
    <h1 className='text-[12px] leading-[14.63px] font-medium mt-[5px]'>Prof. Emily Davis</h1>
    <p className='text-[10px] leading-[14px] font-normal line-clamp-3 mt-[10px]'>The lecture scheduled for August 25 has been canceled due to a departmental meeting. A makeup class will be held on September 1 at the usual time and venue.</p>
 
  <p className='text-darkBlue text-[10px] leading-[14px] font-normal mt-[2px]'>Read more</p> 
  <div className='flex gap-2 items-center'>
      <Image src="/peoples.svg" width={40} height={10} alt='no image'/>
      <p className='text-[8px] leading-[9.75px] font-medium mt-[8px]'>+80 More</p>
  </div>
  </div>   
  )
}

>>>>>>> 17e58c277143578bc44b3b7cd8d75b6ea97232ca
export default AnnoucementCard