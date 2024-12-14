"use client";
import { useEffect, useState } from "react";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

const Counter: React.FC = () => {
  const [time, setTime] = useState<Time>({
    hours: 2,
    minutes: 56,
    seconds: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer); // Stop the timer when it reaches 0
          return prevTime;
        }

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }

        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);

  const formatTime = (unit: number): string => String(unit).padStart(2, "0");

  return (
    <div className="flex items-center justify-center">
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
          {formatTime(time.seconds)}
        </div>
      </div>
    </div>
  );
};

export default Counter;
