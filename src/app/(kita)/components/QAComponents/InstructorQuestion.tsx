import React from 'react';
import Image from 'next/image';

interface InstructorQuestionProps {
  name: string;
  role: string;
  question: string;
  time: string;
  stats: { messages: number; likes: number };
}

const InstructorQuestion: React.FC<InstructorQuestionProps> = ({
  name,
  role,
  question,
  time,
  stats,
}) => {
  return (
    <div className="bg-white p-[16px] sm:p-[20px] rounded-[10px]">
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-[16px]">
          <Image src="/avatar.svg" width={50} height={50} alt="avatar" />
          <div>
            <p className="font-medium text-[14px] sm:text-[20px] leading-[24px]">{name}</p>
            <p className="text-[10px] sm:text-[14px] leading-[17px] mt-[2px] sm:mt-[4px] font-medium text-lightGray">
              <span>{role}</span>
              <span> · {time}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center text-[10px] leading-[12px] font-medium text-lightGray gap-1">
            <p>Only for Instructor</p>
            <Image src="/ques.svg" width={8} height={8} alt="question" />
          </div>
          <div className="flex sm:flex-wrap items-center mt-[10px] gap-2">
            <button className="text-white rounded-[4px] bg-[#23B038] text-[8px] sm:text-[10px] leading-[12px] px-[10px] py-[5px]">
              Good
            </button>
            <button className="text-white rounded-[4px] bg-[#E0161A] text-[8px] sm:text-[10px] leading-[12px] px-[10px] py-[5px]">
              Not Good
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[16px]">
        <p className="text-secondary font-semibold text-[16px] leading-[19px]">Question: 01</p>
        <p className="mt-[10px] text-[16px] font-normal mb-[10px]">{question}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-[10px] gap-3">
          <div className="flex gap-2">
            <span>{stats.messages}</span>
            <Image src="/mIcon.svg" width={12} height={11} alt="" />
          </div>
          <div className="flex gap-2">
            <span>{stats.likes}</span>
            <Image src="/heart.svg" width={12} height={11} alt="" />
          </div>
        </div>
        <div>
          <p className="text-lightGray font-medium text-[10px] leading-[12px]">Marked by Instructor</p>
          <div className="flex gap-2 items-center">
            <Image src="/peoples.svg" width={40} height={10} alt="no image" />
            <button className="text-[#23B038] rounded-[4px] bg-[#F3FFF5] text-[10px] leading-[12px] px-[10px] py-[5px]">
              Good
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorQuestion;
