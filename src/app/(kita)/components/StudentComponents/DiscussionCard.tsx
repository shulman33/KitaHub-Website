import React from "react";
import Image from "next/image";
import { ExtendedSelectMessage } from "../../lib/types";

interface DiscussionCardProps {
  message: ExtendedSelectMessage;
  index: number;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ message, index }) => {
  return (
    <div
      className={`w-full ${
        index % 2 === 0 ? "bg-lightBlue" : "bg-white"
      } relative px-[10px] py-[16px] rounded-[8px]`}
    >
      <div className="flex gap-[10px] items-center">
        <Image
          src={message.userProfilePicture || "/avatar.svg"}
          width={55}
          height={55}
          alt={`${message.userFirstName}'s avatar`}
          className="rounded-full"
        />
        <div>
          <p className="text-[16px] leading-[19.5px] pb-[8px] font-semibold">
            {`${message.userFirstName} ${message.userLastName}`}
          </p>
          <div className="flex gap-[16px]">
            <button
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-lightBlue"
              } text-[12px] px-[6px] py-[3px] roundd font-medium leading-[14px]`}
            >
              {message.className}
            </button>
            <span className="text-[12px] px-[6px] py-[3px] roundd font-medium leading-[14px]">
              {message.createdAtRelative}
            </span>
          </div>
        </div>
        <Image
          className="absolute right-[10px] top-[16px]"
          src="/dots.svg"
          width={4}
          height={20}
          alt="menu"
        />
      </div>
      <p className="text-[14px] mt-[9px] leading-[19.5px] text-[#5C5D73] font-normal">
        {message.content}
      </p>
    </div>
  );
};

export default DiscussionCard;
