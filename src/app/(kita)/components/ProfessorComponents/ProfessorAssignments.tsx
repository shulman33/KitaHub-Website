import React from 'react';
import DropdownMenu from '../StudentComponents/DropDown';
import ProfessorAssignmentCard from './elements/ProfessorAssignmentCard';

interface Assignment {
  title: string;
  course: string;
  description: string[];
  dueDate: string;
  status: string;
}

interface ProfessorAssignmentsProps {
  assignments: Assignment[];
}

const ProfessorAssignments: React.FC<ProfessorAssignmentsProps> = ({ assignments }) => {
  return (
    <div className="p-[16px] sm:p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">🗂️ Assignments</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px]">+ New Assignment</p>
        </div>
      </div>

      {/* Sort and Status */}
      <div className="text-lightGray flex justify-between items-center text-[14px] leading-[17px]">
        <p>Pending Submission</p>
        <div className="flex items-center justify-center gap-1">
          <p className="text-[10px]">Sort By:</p>
          <DropdownMenu />
        </div>
      </div>

      {/* Dynamic Assignment Cards */}
      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <ProfessorAssignmentCard
            key={index}
            title={assignment.title}
            course={assignment.course}
            description={assignment.description}
            dueDate={assignment.dueDate}
            status={assignment.status}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-[16px]">No assignments available.</p>
      )}
    </div>
  );
};

export default ProfessorAssignments;
