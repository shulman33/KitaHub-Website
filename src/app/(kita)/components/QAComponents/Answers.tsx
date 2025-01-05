import React from 'react';
import Image from 'next/image';

interface AnswerProps {
  name: string;
  description: string;
  role: string;
  time: string;
}

const Answers: React.FC<AnswerProps> = ({ name, description, role, time }) => {
  return (
    <div className="bg-white p-[20px] rounded-[10px] mt-[24px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[16px]">
          <Image src="/avatar.svg" width={50} height={50} alt="avatar" />
          <div>
            <p className="font-medium text-[20px] leading-[24px]">{name}</p>
            <p className="text-[14px] leading-[17px] mt-[4px] font-medium text-lightGray">
              <span>{role}</span>
              <span> · {time}</span>
            </p>
          </div>
        </div>
        <div>
          <Image src="/dots.svg" width={4} height={20} alt="" />
        </div>
      </div>
      <div className="mt-[16px]">
        <p className="mt-[10px] text-[16px] font-normal mb-[10px]">{description}</p>
      </div>
      <div className="flex justify-end items-center">
        <div className="flex items-center text-[10px] gap-3">
          <div className="flex gap-2">
            <span>8</span>
            <Image src="/mIcon.svg" width={12} height={11} alt="" />
          </div>
          <div className="flex gap-2">
            <span>8</span>
            <Image src="/heart.svg" width={12} height={11} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
