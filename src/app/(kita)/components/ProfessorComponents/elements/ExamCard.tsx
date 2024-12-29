import React from 'react';

interface ExamCardProps {
  date: string;
  details: string;
}

export const ExamCard: React.FC<ExamCardProps> = ({ date, details }) => {
  return (
    <div className="bg-white mb-[16px] text-lightGray w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]">
      <p className="text-[8px] font-medium leading-[9.75px]">{date}</p>
      <p className="text-[10px] leading-[14px] font-normal">{details}</p>
    </div>
  );
};
