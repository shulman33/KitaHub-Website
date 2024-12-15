import React from 'react';
import Link from 'next/link';

interface AssignmentsLinkCardProps {
  subject: string;
  date: string;
  link: string;
}

const AssignmentsLinkCard: React.FC<AssignmentsLinkCardProps> = ({
  subject,
  date,
  link,
}) => {
  return (
    <div className="custom-border mb-[16px] border rounded-[8px] p-[12px] w-[205px]">
      {/* Subject */}
      <p className="text-secondary font-medium text-[12px] leading-[14px]">
        {subject}
      </p>

      {/* Link */}
      <Link
        className="text-darkBlue text-[10px] leading-[14px] hover:underline"
        href={link}
        target="_blank"
      >
        View Assignment Details
      </Link>

      {/* Date */}
      <p className="text-lightGray text-[8px] leading-[12px] mt-[5px]">
        {date}
      </p>
    </div>
  );
};

export default AssignmentsLinkCard;
