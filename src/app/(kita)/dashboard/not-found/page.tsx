
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
        <Image src="/Opps.svg" width={353} height={156} alt=''/>
        <p className='mb-[50px] mt-[10px]'>Page Not Found</p>
        <Image src="/OBJECTS.svg" width={797} height={423} alt=''/>

        <button className='bg-[#0D6CFF] mt-[70px] rounded-[4px] text-[16px] py-[16px] px-[32px] text-white'>Go To Homepage</button>
    </div>
  )
}

export default page