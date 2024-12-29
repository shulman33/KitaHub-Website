import React from 'react';
import Image from 'next/image';

interface StudentContactCardProps {
  name: string;
  // performance: string;
  // grade: string;
}

const StudentContactCard: React.FC<StudentContactCardProps> = ({ name }) => {
  return (
    <div className="flex mb-[16px] justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src="/avatar.svg" width={50} height={50} alt="avatar" />
        <div>
          <p className="text-[16px] font-semibold leading-[19px]">{name}</p>
          {/* <p className="text-[10px] leading-[12px] text-lightGray font-medium">
            Performance: {performance} / {grade}
          </p> */}
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <Image src="/message2.svg" width={20} height={20} alt="message" />
        <Image src="/dots2.svg" alt="menu" width={20} height={20} />
      </div>
    </div>
  );
};

export default StudentContactCard;
