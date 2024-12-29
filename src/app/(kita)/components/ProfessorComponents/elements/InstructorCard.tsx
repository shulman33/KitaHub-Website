import React from 'react';

interface InstructorCardProps {
  date: string;
  name: string;
  email: string;
  officeHours: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ date, name, email, officeHours }) => {
  return (
    <div className="bg-white mb-[16px] group w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]">
      <p className="text-[8px] font-medium text-lightGray group-hover:text-white leading-[9.75px]">{date}</p>
      <p className="text-[12px] leading-[14px] font-medium my-[5px]">{name}</p>
      <p className="font-normal text-[10px] group-hover:text-white leading-[14px] mb-[10px]">{email}</p>
      <p className="text-lightGray group-hover:text-white text-[10px] leading-[14px] font-normal">
        <span className="group-hover:text-white font-medium text-secondary">Office Hours:</span> {officeHours}
      </p>
    </div>
  );
};

export default InstructorCard;
