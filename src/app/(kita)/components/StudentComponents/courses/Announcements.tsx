import React from 'react';
import AnnoucementCard from './AnnoucementCard';

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

const Announcements: React.FC<AnnouncementsProps> = ({ categories }) => {
  return (
    <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] leading-[19.5px] font-bold">📢 Announcements</p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
          View All
        </button>
      </div>

      {/* Horizontal Scrollable Section */}
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
    </div>
  );
};

export default Announcements;
