import React from 'react';
import AnnoucementCard from '../StudentComponents/courses/AnnoucementCard';
import { ExamCard } from './elements/ExamCard';
import InstructorCard from './elements/InstructorCard';

interface Announcement {
  date: string;
  professor: string;
  description: string;
}

interface Exam {
  date: string;
  details: string;
}

interface Instructor {
  date: string;
  name: string;
  email: string;
  officeHours: string;
}

interface ProfessorAnnoucmentsProps {
  announcements: Announcement[];
  exams: Exam[];
  instructors: Instructor[];
}

const ProfessorAnnoucments: React.FC<ProfessorAnnoucmentsProps> = ({
  announcements,
  exams,
  instructors,
}) => {
  return (
    <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      {/* Static Header */}
      <div className="flex justify-between items-center mb-[16px]">
        <p className="text-[16px] leading-[19.5px] font-bold">📢 Assignments Announcements</p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">+ Add Announcement</button>
      </div>

      {/* Scrollable Section */}
      <div className="overflow-x-auto">
        <div className="flex gap-[16px] w-max">
          {/* Schedule Changes */}
          <div className="bg-white p-[8px] flex-shrink-0 w-[188px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px] border-[#0D6CFF14] leading-[17px]">
              Schedule Changes
            </p>
            {announcements.map((announcement, index) => (
              <AnnoucementCard
                key={index}
                date={announcement.date}
                professor={announcement.professor}
                description={announcement.description}
              />
            ))}
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white p-[8px] flex-shrink-0 w-[188px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px] border-[#0D6CFF14] leading-[17px]">
              Upcoming Exams
            </p>
            {exams.map((exam, index) => (
              <ExamCard key={index} date={exam.date} details={exam.details} />
            ))}
          </div>

          {/* Instructor Contact */}
          <div className="bg-white p-[8px] flex-shrink-0 w-[188px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px] border-[#0D6CFF14] leading-[17px]">
              Instructor Contact
            </p>
            {instructors.map((instructor, index) => (
              <InstructorCard
                key={index}
                date={instructor.date}
                name={instructor.name}
                email={instructor.email}
                officeHours={instructor.officeHours}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorAnnoucments;
