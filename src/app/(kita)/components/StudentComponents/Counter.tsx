"use client";

import React, { useEffect, useState } from "react";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds?: number;
};

interface CounterProps {
  initialTime: Time;
}

const Counter: React.FC<CounterProps> = ({ initialTime }) => {
  const [time, setTime] = useState<Time>({
    days: initialTime.days,
    hours: initialTime.hours,
    minutes: initialTime.minutes,
    seconds: 0, // We'll add seconds for smoother countdown
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { days, hours, minutes, seconds = 0 } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { days, hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        }

        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (unit: number): string => String(unit).padStart(2, "0");

  return (
    <div className="flex items-center justify-center">
      {time.days > 0 && (
        <>
          <div className="flex justify-center flex-col">
            <p className="text-[8px] font-400 text-center mb-[4px] leading-[9.75px]">
              Days
            </p>
            <div className="w-[37px] bg-[#EFF4FF] flex justify-center items-center h-[28px] rounded-[4px] text-[16px] leading-[19.5px] font-bold">
              {formatTime(time.days)}
            </div>
          </div>
          <p className="font-bold text-[16px] mx-[4px] mt-[2px] leading-[19.5px]">
            :
          </p>
        </>
      )}
      <div className="flex justify-center flex-col">
        <p className="text-[8px] font-400 text-center mb-[4px] leading-[9.75px]">
          Hours
        </p>
        <div className="w-[37px] bg-[#EFF4FF] flex justify-center items-center h-[28px] rounded-[4px] text-[16px] leading-[19.5px] font-bold">
          {formatTime(time.hours)}
        </div>
      </div>
      <p className="font-bold text-[16px] mx-[4px] mt-[2px] leading-[19.5px]">
        :
      </p>
      <div className="flex justify-center flex-col">
        <p className="text-[8px] text-center font-400 mb-[4px] leading-[9.75px]">
          Minutes
        </p>
        <div className="w-[37px] bg-[#EFF4FF] flex justify-center items-center h-[28px] rounded-[4px] text-[16px] leading-[19.5px] font-bold">
          {formatTime(time.minutes)}
        </div>
      </div>
      <p className="font-bold text-[16px] mx-[4px] mt-[2px] leading-[19.5px]">
        :
      </p>
      <div className="flex justify-center flex-col">
        <p className="text-[8px] text-center font-400 mb-[4px] leading-[9.75px]">
          Seconds
        </p>
        <div className="w-[37px] bg-[#EFF4FF] flex justify-center items-center h-[28px] rounded-[4px] text-[16px] leading-[19.5px] font-bold">
          {formatTime(time.seconds || 0)}
        </div>
      </div>
    </div>
  );
};

export default Counter;
