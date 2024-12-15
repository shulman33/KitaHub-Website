import React from 'react';
import Image from 'next/image';

interface ProfessorAssignmentCardProps {
  title: string;
  course: string;
  description: string[];
  dueDate: string;
  status: string;
}

const ProfessorAssignmentCard: React.FC<ProfessorAssignmentCardProps> = ({
  title,
  course,
  description,
  dueDate,
  status,
}) => {
  return (
    <div className="border border-[#0D6CFF14] rounded-[8px] mt-[16px] p-[10px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-medium leading-[12px]">{title}</p>
        <Image src="/dots2.svg" width={20} height={4} alt="menu" />
      </div>

      {/* Course and Description */}
      <div>
        <div className="mt-[5px] gap-[50px] flex justify-between">
          <div>
            <p className="font-medium text-[16px] leading-[19px]">{course}</p>
            <ul className="text-[8px] leading-[12px] text-lightGray mt-[8px] font-normal">
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Due Date */}
          <div>
            <span className="text-lightGray text-[7px] sm:text-[8px] leading-[9px]">Due Date:</span>
            <p className="font-medium text-[10px] sm:text-[12px] leading-[12px] sm:leading-[24px]">
              {dueDate}
            </p>
          </div>
        </div>

        {/* Status */}
        <button className="text-[#0B0B2C] mt-[10px] bg-[#EEEEEE] p-[5px] rounded-[4px] text-[8px] leading-[9px]">
          {status}
        </button>
      </div>
    </div>
  );
};

export default ProfessorAssignmentCard;
