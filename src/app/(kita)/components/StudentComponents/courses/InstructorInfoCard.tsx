import React from 'react';
import Image from 'next/image';

interface InstructorInfoCardProps {
  name: string;
  email: string;
}

const InstructorInfoCard: React.FC<InstructorInfoCardProps> = ({
  name,
  email,
}) => {
  return (
    <div className="flex justify-between pb-[8px] border-[#0D6CFF14] border-b items-center">
      {/* Instructor Details */}
      <div className="flex gap-2 items-center">
        <Image src="/avatar.svg" width={46} height={46} alt="logo" />
        <div className="flex flex-col">
          <h1 className="text-[16px] font-semibold leading-[19.5px]">{name}</h1>
        </div>
      </div>

      {/* Contact Info */}
      <div className="gap-[4px] flex flex-col">
        <div className="flex items-center gap-1">
        </div>
        <div className="flex items-center gap-1">
          <Image src="/message.svg" width={12} height={12} alt="message" />
          <p className="text-[10px] flex-shrink-0 leading-[12px] font-medium">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfoCard;
