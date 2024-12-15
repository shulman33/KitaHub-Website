"use client"
import React, { useState } from 'react';
import CalendarCard from './elements/CalendarCard';

interface Event {
  time: string;
  title: string;
  attendeesCount: number;
  duration: string;
  status: string;
  date: number; // Added to match events with dates
}

interface CalendarProps {
  dates: { day: string; date: number }[];
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ dates, events }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null); // Track selected date

  const filteredEvents = selectedDate
    ? events.filter(event => event.date === selectedDate)
    : events;

  return (
    <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">📅 Calendar</p>
        </div>
      </div>

      {/* Scrollable Dates Section */}
      <div className="overflow-x-auto">
        <div className="flex gap-[18px] mb-[24px] w-max">
          {dates.map((date, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(date.date)} // Update selected date on click
              className={`cursor-pointer h-[87px] min-w-[59px] rounded-[8px] flex flex-col justify-center items-center ${
                selectedDate === date.date ? 'bg-darkBlue text-white' : 'bg-lightBlue'
              }`}
            >
              <p className="font-normal text-[14px] leading-[17px]">{date.day}</p>
              <p className="font-bold leading-[24px] text-[29px] mt-[13px]">{date.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Calendar Cards */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <CalendarCard
            key={index}
            time={event.time}
            title={event.title}
            attendeesCount={event.attendeesCount}
            duration={event.duration}
            status={event.status}
          />
        ))
      ) : (
        <p className="text-center text-lightGray">No events for this date</p>
      )}
    </div>
  );
};

export default Calendar;
