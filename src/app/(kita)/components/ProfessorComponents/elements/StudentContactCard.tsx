import React from 'react'
import Image from 'next/image'
const StudentContactCard = () => {
  return (
    <div className='flex mb-[16px]  justify-between items-center'>
    <div className='flex items-center gap-2'>
        <Image src="/avatar.svg" width={50} height={50} alt='avatar'/>
        <div >
            <p className='text-[16px] font-semibold leading-[19px]'>John Doe</p>
            <p className='text-[10px] leading-[12px] text-lightGray font-medium'>Performance: A- / 90%</p>
        </div>
    </div>
    <div className='flex items-center gap-[12px]'>
        <Image src="/message2.svg" width={20} height={20} alt="call"/>
        <Image src="/dots2.svg" alt='no image' width={20} height={20}/>
    </div>
</div>
  )
}

export default StudentContactCard