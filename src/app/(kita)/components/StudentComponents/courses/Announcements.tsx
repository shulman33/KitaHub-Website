import React from "react";
import AnnoucementCard from "./AnnoucementCard";
import EmptyState from "@/app/(marketing)/components/empty-state";

interface Announcement {
  date: string;
  professor: string;
  description: string;
}

interface AnnouncementCategory {
  title: string;
  announcements: Announcement[];
}

interface AnnouncementsProps {
  categories: AnnouncementCategory[];
}

const BlankPaperIcon = () => {
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
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const Announcements: React.FC<AnnouncementsProps> = ({ categories }) => {
  return (
    <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] leading-[19.5px] font-bold">
          📢 Announcements
        </p>
        {categories.length > 0 && (
          <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
            View All
          </button>
        )}
      </div>

      {/* Content */}
      {categories.length > 0 ? (
        /* Horizontal Scrollable Section */
        <div className="flex gap-[16px] mt-[16px] overflow-x-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-[8px] flex-shrink-0 w-[188px] flex flex-col rounded-[8px] border border-[#0D6CFF14]"
            >
              {/* Category Title */}
              <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px] border-[#0D6CFF14] leading-[17px]">
                {category.title}
              </p>
              {/* Announcement Cards */}
              {category.announcements.map((announcement, i) => (
                <AnnoucementCard
                  key={i}
                  date={announcement.date}
                  professor={announcement.professor}
                  description={announcement.description}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[24px]">
          <EmptyState
            icon={<BlankPaperIcon />}
            title="No Announcements Yet"
            text="The professor has not posted any announcements yet"
            buttonText="Join a Class"
          />
        </div>
      )}
    </div>
  );
};

export default Announcements;
