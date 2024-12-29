import React from "react";
import AnnoucementCard from "../StudentComponents/courses/AnnoucementCard";
import { ExamCard } from "./elements/ExamCard";
import InstructorCard from "./elements/InstructorCard";
import EmptyState from "@/app/(marketing)/components/empty-state";

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

const AnnoucementIcon = () => {
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
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
      />
    </svg>
  );
};

const ProfessorAnnoucments: React.FC<ProfessorAnnoucmentsProps> = ({
  announcements,
  exams,
  instructors,
}) => {
  const hasContent =
    announcements.length > 0 || exams.length > 0 || instructors.length > 0;

  return (
    <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      {/* Static Header */}
      <div className="flex justify-between items-center mb-[16px]">
        <p className="text-[16px] leading-[19.5px] font-bold">
          📢 Assignments Announcements
        </p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold hover:text-blue-600">
          + Add Announcement
        </button>
      </div>

      {/* Content */}
      {hasContent ? (
        <div className="overflow-x-auto">
          <div className="flex gap-[16px] w-max">
            {/* Schedule Changes */}
            {announcements.length > 0 && (
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
            )}

            {/* Upcoming Exams */}
            {exams.length > 0 && (
              <div className="bg-white p-[8px] flex-shrink-0 w-[188px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
                <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px] border-[#0D6CFF14] leading-[17px]">
                  Upcoming Exams
                </p>
                {exams.map((exam, index) => (
                  <ExamCard
                    key={index}
                    date={exam.date}
                    details={exam.details}
                  />
                ))}
              </div>
            )}

            {/* Instructor Contact */}
            {instructors.length > 0 && (
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
            )}
          </div>
        </div>
      ) : (
        <div className="mt-[24px]">
          <EmptyState
            icon={<AnnoucementIcon />}
            title="No Announcements Yet"
            text="Create your first announcement to keep your students informed"
            buttonText="Create Announcement"
          />
        </div>
      )}
    </div>
  );
};

export default ProfessorAnnoucments;
