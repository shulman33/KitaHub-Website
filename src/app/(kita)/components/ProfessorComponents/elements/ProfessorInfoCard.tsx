import React from 'react';
import Image from 'next/image';

interface ProfessorInfoCardProps {
  courseName: string;
  professor: string;
  date: string;
  enrollmentCount: number;
  assignmentsCount: number;
  recentActivity: string;
}

const ProfessorInfoCard: React.FC<ProfessorInfoCardProps> = ({
  courseName,
  professor,
  date,
  enrollmentCount,
  assignmentsCount,
  recentActivity,
}) => {
  return (
    <div className="mt-[20px]">
      {/* Course Name */}
      <div className="flex items-center justify-between mb-[14px]">
        <p className="font-bold text-[20px] leading-[24px]">{courseName}</p>
        <Image src="/dots2.svg" width={20} height={4} alt="Menu" />
      </div>

      {/* Professor and Date */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-[16px] leading-[19px]">{professor}</p>
        <p className="text-[12px] leading-[24px] font-medium text-lightGray">{date}</p>
      </div>

      {/* Enrollment and Assignments */}
      <div className="text-lightGray gap-2 flex justify-between items-center font-medium text-[12px] leading-[14px]">
        <div className="flex items-center gap-1 mt-[16px] mb-[11px]">
          <p>Enrollment:</p>
          <div className="flex gap-2 items-center">
            <Image src="/peoples.svg" width={40} height={10} alt="Enrollment" />
            <p className="text-[8px] leading-[9.75px] font-medium">+{enrollmentCount} More</p>
          </div>
        </div>
        <p>Assignments: {assignmentsCount}</p>
      </div>

      {/* Recent Activity */}
      <p className="text-lightGray text-[12px] leading-[14px] font-medium">
        Recent Activity: {recentActivity}
      </p>
    </div>
  );
};

export default ProfessorInfoCard;
