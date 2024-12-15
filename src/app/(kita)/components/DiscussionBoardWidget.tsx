import React from "react";
import SearchBar from "./StudentComponents/SearchBar";
import DropdownMenu from "./StudentComponents/DropDown";
import DiscussionCard from "./StudentComponents/DiscussionCard";

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
}

interface MessageWidgetProps {
  messages: Message[];
}

const DiscussionBoardWidget: React.FC<MessageWidgetProps> = ({ messages }) => {
  return (
    <div className="p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto bg-white">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">💬 Discussion Board</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px]">+ New Discussion</p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="flex py-[20px] justify-between gap-4">
        <SearchBar />
        <DropdownMenu />
      </div>

      {/* Dynamic Discussion Cards */}
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <DiscussionCard
            key={message.id}
            index={index}
            user={message.user}
            time={message.time}
            message={message.message}
          />
        ))
      ) : (
        <p className="text-gray-500 py-4">No discussions available</p>
      )}
    </div>
  );
};

export default DiscussionBoardWidget;
