"use client"
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function CalendarComponent() {
  return (
    <>
     <div className='p-[24px] h-full bg-white rounded-[16px]'>

     <p className='text-[16px] leading-[19.5px] font-bold'>📅 Upcoming Deadline</p>
    <div className='border border-[#0D6CFF14] rounded-[10px] mt-[24px]'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
    </div>
    
    </div>
    </>
  );
}