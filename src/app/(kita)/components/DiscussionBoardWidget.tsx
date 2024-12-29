import React from "react";
import SearchBar from "./StudentComponents/SearchBar";
import DropdownMenu from "./StudentComponents/DropDown";
import DiscussionCard from "./StudentComponents/DiscussionCard";
import { ExtendedSelectMessage } from "../lib/types";
import EmptyState from "@/app/(marketing)/components/empty-state";

interface MessageWidgetProps {
  messages: ExtendedSelectMessage[];
}

const MessageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-12 w-12 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
};

const DiscussionBoardWidget: React.FC<MessageWidgetProps> = ({ messages }) => {
  return (
    <div className="p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto bg-white">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">
            💬 Discussion Board
          </p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px] cursor-pointer hover:text-blue-600">
            + New Discussion
          </p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="flex py-[20px] justify-between gap-4">
        <SearchBar />
        <DropdownMenu />
      </div>

      {/* Dynamic Discussion Cards */}
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <DiscussionCard key={message.id} message={message} index={index} />
          ))
        ) : (
          <EmptyState
            icon={<MessageIcon />}
            title="No Discussions Yet"
            text="Start a new discussion to get the conversation going"
            buttonText="New Discussion"
          />
        )}
      </div>
    </div>
  );
};

export default DiscussionBoardWidget;
