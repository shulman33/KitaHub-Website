import React from 'react';
import Image from 'next/image';

interface AnnouncementCardProps {
  date: string;
  professor: string;
  description: string;
}

const AnnoucementCard: React.FC<AnnouncementCardProps> = ({
  date,
  professor,
  description,
}) => {
  return (
    <div className="bg-white mb-[16px] w-[172px] hover:bg-darkBlue hover:text-white border rounded-[8px] p-[12px] border-[#0D6CFF14]">
      <p className="text-[8px] font-medium leading-[9.75px]">{date}</p>
      <h1 className="text-[12px] leading-[14.63px] font-medium mt-[5px]">
        {professor}
      </h1>
      <p className="text-[10px] leading-[14px] font-normal line-clamp-3 mt-[10px]">
        {description}
      </p>
      <p className="text-darkBlue text-[10px] leading-[14px] font-normal mt-[2px]">
        Read more
      </p>
      <div className="flex gap-2 items-center">
        <Image src="/peoples.svg" width={40} height={10} alt="no image" />
        <p className="text-[8px] leading-[9.75px] font-medium mt-[8px]">+80 More</p>
      </div>
    </div>
  );
};

export default AnnoucementCard;
