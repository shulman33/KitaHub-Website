import React from "react";
import Image from "next/image";

interface DiscussionCardProps {
  index: number;
  user: string;
  message: string;
  time: string;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  index,
  user,
  message,
  time,
}) => {
  return (
    <div
      className={`w-full ${
        index % 2 === 0 ? "bg-lightBlue" : "bg-white"
      } relative px-[10px] py-[16px] rounded-[8px]`}
    >
      <div className="flex gap-[10px] items-center">
        <Image
          src="/avatar.svg"
          width={55}
          height={55}
          alt="no image"
          className="rounded-full"
        />
        <div>
          <p className="text-[16px] leading-[19.5px] pb-[8px] font-semibold">
            {user}
          </p>
          <div className="flex gap-[16px]">
            <button
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-lightBlue"
              } text-[12px] px-[6px] py-[3px] roundd font-medium leading-[14px]`}
            >
              Class 9
            </button>
            <span className="text-[12px] px-[6px] py-[3px] roundd font-medium leading-[14px]">
              ({time})
            </span>
          </div>
        </div>
        <Image
          className="absolute right-[10px] top-[16px]"
          src="/dots.svg"
          width={4}
          height={20}
          alt="no image"
        />
      </div>
      <p className="text-[14px] mt-[9px] leading-[19.5px] text-[#5C5D73] font-normal">
        {message}
      </p>
    </div>
  );
};

export default DiscussionCard;
