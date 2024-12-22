import React from "react";
import DropdownMenu from "../StudentComponents/DropDown";
import ProfessorAssignmentCard from "./elements/ProfessorAssignmentCard";
import EmptyState from "@/app/(marketing)/components/empty-state";
import { ExtendedSelectAssignment } from "../../lib/types";

interface Assignment {
  title: string;
  course: string;
  description: string[];
  dueDate: string;
  status: string;
}

interface ProfessorAssignmentsProps {
  assignments: ExtendedSelectAssignment[];
}

const AssignmentIcon = () => {
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
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
};

const ProfessorAssignments: React.FC<ProfessorAssignmentsProps> = ({
  assignments,
}) => {
  const hasAssignments = assignments.length > 0;

  return (
    <div className="p-[16px] sm:p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">🗂️ Assignments</p>
        </div>
        <div>
          <button className="text-[#74759A] text-[14px] hover:text-blue-600">
            + New Assignment
          </button>
        </div>
      </div>

      {/* Sort and Status */}
      {hasAssignments && (
        <div className="text-lightGray flex justify-between items-center text-[14px] leading-[17px] mb-[16px]">
          <p>Pending Submission</p>
          <div className="flex items-center justify-center gap-1">
            <p className="text-[10px]">Sort By:</p>
            <DropdownMenu />
          </div>
        </div>
      )}

      {/* Content */}
      {hasAssignments ? (
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <ProfessorAssignmentCard
              key={index}
              title={assignment.title}
              course={assignment.course}
              description={assignment.description}
              dueDate={assignment.dueDate}
              status={assignment.status}
            />
          ))}
        </div>
      ) : (
        <div className="mt-[24px]">
          <EmptyState
            icon={<AssignmentIcon />}
            title="No Assignments Yet"
            text="Create your first assignment to get started"
            buttonText="Create Assignment"
          />
        </div>
      )}
    </div>
  );
};

export default ProfessorAssignments;
