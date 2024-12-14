
import React from 'react'
import Image from 'next/image'
import CalendarCard from './elements/CalendarCard'
const Calendar = () => {
  return (
    <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px]  leading-[19px] font-bold  ">📅 Calendar</p>
        </div>


      </div>

      <div className='flex gap-[18px] mb-[24px]'>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Mon</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>16</p>
        </div>
       
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Tue</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>17</p>
        </div>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Wed</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>18</p>
        </div>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Thur</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>19</p>
        </div>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Fri</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>20</p>
        </div>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Sat</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>21</p>
        </div>
        <div className='bg-lightBlue h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center'>
          <p className=' font-normal text-[14px] leading-[17px]'>Sun</p>
          <p className=' font-bold leading-[24px] text-[29px] mt-[13px]'>22</p>
        </div>
      </div>

     <CalendarCard/>
     <CalendarCard/>
     <CalendarCard/>
    </div>
  )
}

export default Calendar