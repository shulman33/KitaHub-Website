import React from 'react';
import Image from 'next/image';

interface ResourceCardProps {
  date: string;
  title: string;
  downloadLink: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ date, title, downloadLink }) => {
  return (
    <div className="flex justify-between items-center mt-[24px]">
      {/* Resource Info */}
      <div className="text-secondary">
        <p className="text-[14px] font-semibold leading-[22px]">{date}</p>
        <p className="text-[14px] leading-[22px] font-normal">{title}</p>
      </div>

      {/* Download Button */}
      <div className="flex flex-col justify-center items-center">
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          <Image src="/download.svg" width={20} height={20} alt="Download icon" />
        </a>
        <p className="text-[14px] text-center text-[#0D6CFF] font-medium leading-[17px]">
          Download Slides
        </p>
      </div>
    </div>
  );
};

export default ResourceCard;
