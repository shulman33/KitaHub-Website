import React from 'react';
import UpcomingAssignmentCard from './UpcomingAssignmentCard';
import PastAssignmentsCard from './PastAssignmentsCard';
import AssignmentsLinkCard from './AssignmentsLinkCard';

interface Assignment {
  date: string;
  status?: string;
  subject: string;
  grade?: string;
  feedback?: string;
  type: 'upcoming' | 'past' | 'link';
}

interface AssignmentsProps {
  assignments: Assignment[];
}

const Assignments: React.FC<AssignmentsProps> = ({ assignments }) => {
  const upcomingAssignments = assignments.filter((a) => a.type === 'upcoming');
  const pastAssignments = assignments.filter((a) => a.type === 'past');
  const assignmentLinks = assignments.filter((a) => a.type === 'link');

  return (
    <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[16px] leading-[19.5px] font-bold">🗂️ Assignments</p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
          View All
        </button>
      </div>

      {/* Scrollable Cards */}
      <div className="flex gap-[16px] overflow-x-auto mt-[16px]">
        {/* Upcoming Assignments */}
        {upcomingAssignments.length > 0 && (
          <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
              Upcoming Assignments
            </p>
            {upcomingAssignments.map((assignment, index) => (
              <UpcomingAssignmentCard
                key={index}
                date={assignment.date}
                status={assignment.status || 'Pending'}
                subject={assignment.subject}
              />
            ))}
          </div>
        )}

        {/* Past Assignments */}
        {pastAssignments.length > 0 && (
          <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
              Past Assignments
            </p>
            {pastAssignments.map((assignment, index) => (
              <PastAssignmentsCard
                key={index}
                professor="Prof. Emily Davis"
                grade={assignment.grade || 'N/A'}
                date={assignment.date}
                feedback={assignment.feedback || 'No feedback available'}
              />
            ))}
          </div>
        )}

        {/* Assignments Link */}
        {assignmentLinks.length > 0 && (
          <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
            <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
              Assignments Link
            </p>
            {assignmentLinks.map((assignment, index) => (
              <AssignmentsLinkCard
                key={index}
                subject={assignment.subject}
                date={assignment.date}
                link="#"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
