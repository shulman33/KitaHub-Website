import React from 'react';
import Image from 'next/image';

interface PastAssignmentsCardProps {
  professor: string;
  grade: string;
  date: string;
  feedback: string;
}

const PastAssignmentsCard: React.FC<PastAssignmentsCardProps> = ({
  professor,
  grade,
  date,
  feedback,
}) => {
  return (
    <div className="bg-white w-[205px] group hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[12px] leading-[14.63px] font-medium mb-[5px]">
          {professor}
        </h1>
        <p className="text-[#23B038] text-[8px] leading-[9.75px] font-semibold">
          Grade: {grade}
        </p>
      </div>

      {/* Date */}
      <p className="text-[8px] font-medium leading-[9.75px]">{date}</p>

      {/* Feedback */}
      <p className="text-[10px] leading-[14px] font-normal line-clamp-3 mt-[10px]">
        <span className="text-secondary font-medium group-hover:text-white">
          Instructor Feedback:
        </span>{' '}
        {feedback}
      </p>

      {/* Read More */}
      <p className="text-darkBlue text-[10px] leading-[14px] font-normal mt-[2px]">
        Read more
      </p>

      {/* Image */}
      <div className="flex gap-2 items-center">
        <Image src="/peoples.svg" width={40} height={10} alt="no image" />
        <p className="text-[8px] leading-[9.75px] font-medium mt-[8px]">
          +80 More
        </p>
      </div>
    </div>
  );
};

export default PastAssignmentsCard;
