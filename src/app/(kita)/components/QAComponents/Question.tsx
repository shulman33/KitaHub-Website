import Image from 'next/image';
import React from 'react';

interface QuestionProps {
  title: string;
  description: string;
  tags: string[];
  stats: { messages: number; likes: number };
}

const Question: React.FC<QuestionProps> = ({ title, description, tags, stats }) => {
  return (
    <div className="p-[24px] border-t border-[#0D6CFF14]">
      <div className="mb-[10px] flex gap-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/ques.svg" width={20} height={20} alt="info" />
          <p className="font-semibold text-[14px] sm:text-[20px] leading-[24px]">
            {title}
          </p>
        </div>
        <Image src="/pin.svg" width={16} height={16} alt="pinned" />
      </div>
      <p className="text-lightGray text-[10px] leading-[14px] mb-[10px]">
        {description}
      </p>
      <div className="flex lg:flex-nowrap flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-[10px]">
          {tags.map((tag, index) => (
            <p key={index} className="bg-lightBlue text-[12px] rounded-[4px] text-darkBlue py-[5px] px-[10px]">
              {tag}
            </p>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default Question;
