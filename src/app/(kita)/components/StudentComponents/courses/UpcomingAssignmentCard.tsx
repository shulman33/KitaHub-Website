import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UpcomingAssignmentCardProps {
  date: string;
  status: string;
  subject: string;
}

const UpcomingAssignmentCard: React.FC<UpcomingAssignmentCardProps> = ({
  date,
  status,
  subject,
}) => {
  return (
    <div className="custom-border mb-[16px] border rounded-[8px] p-[12px] w-[205px]">
      <div className="flex justify-between">
        <p className="text-[8px] text-lightGray leading-[9px]">{date}</p>
        <button className="bg-[#23B038] rounded-[4px] text-[8px] text-white p-[5px]">
          {status}
        </button>
      </div>
      <p className="text-secondary font-medium text-[12px] leading-[14px]">
        {subject}
      </p>
      <Link className="text-darkBlue text-[10px] leading-[14px]" href="#">
        View Assignment Details
      </Link>
      <div className="flex gap-2 mt-[5px] items-center">
        <Image src="/peoples.svg" width={40} height={10} alt="no image" />
        <p className="text-[8px] leading-[9.75px] font-medium mt-[8px]">+80 More</p>
      </div>
    </div>
  );
};

export default UpcomingAssignmentCard;
