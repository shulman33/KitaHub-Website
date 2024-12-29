import Image from 'next/image';
import React from 'react';

interface UpcomingDeadlineProps {
  month: string;
  year: number;
}

const UpcomingDeadline: React.FC<UpcomingDeadlineProps> = ({ month, year }) => {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days = [
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];

  return (
    <section className="flex flex-col rounded-none max-w-[420px]">
      <div className="flex flex-col p-4 w-full bg-white rounded-2xl shadow-[0px_4px_45px_rgba(13,108,255,0.08)]">
        <h2 className="self-start text-base font-bold text-slate-900">
          📅 Upcoming Deadline
        </h2>
        <div className="flex flex-col pt-7 pb-12 mt-5 bg-white rounded-xl border border-solid border-blue-600 border-opacity-10 shadow-[0px_2px_23px_rgba(13,108,255,0.08)]">
          <div className="flex z-10 flex-col px-8 pb-2 w-full">
            <div className="flex gap-5 justify-between w-full">
              <div className="text-base font-medium tracking-wide text-center text-slate-500">
                {month} {year}
              </div>
              <div className="flex gap-3 self-start">
                <Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad64beb8-43ff-4a27-ab1c-569751a113f7?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
                  className="object-contain shrink-0 rounded-xl aspect-square bg-slate-50 h-[22px] w-[22px]"
                  alt=""
                />
                <Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e70040e2-aadf-4647-8905-9dcda4c56212?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
                  className="object-contain shrink-0 rounded-xl aspect-square bg-slate-50 h-[22px] w-[22px]"
                  alt=""
                />
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-8 text-base font-medium leading-none text-center whitespace-nowrap text-slate-700 text-opacity-50">
              {weekdays.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            {days.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex gap-8 mt-6 text-base font-medium text-center whitespace-nowrap text-slate-500"
              >
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`${
                      day === 6 || day === 9 || day === 14
                        ? 'px-3.5 text-blue-600 bg-indigo-50 rounded-full h-[35px] w-[35px]'
                        : day < 4
                        ? 'text-zinc-200'
                        : ''
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDeadline;