import React from "react";
import SubmissionStatusButton from "./StudentComponents/SubmissionStatusButton";
import AssigmentRow from "./StudentComponents/AssigmentRow";

interface Assignment {
  name: string;
  title: string;
  status: string;
}

interface SubmissionStatusWidgetProps {
  assignments: Assignment[];
}

const SubmissionStatusWidget: React.FC<SubmissionStatusWidgetProps> = ({
  assignments,
}) => {
  return (
    <div className="bg-white p-[24px] max-w-full overflow-x-auto h-[420px] w-full rounded-[16px] overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <SubmissionStatusButton />
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
          View All
        </button>
      </div>

      {/* Table Headers */}
      <div className="overflow-x-auto">
        <div className="flex w-full flex-shrink-0 justify-between min-w-[800px] border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px] font-semibold text-[16px] text-secondary leading-[19.5px]">
          <p>Assignments</p>
          <p>Title</p>
          <p>Due Date</p>
          <p>Status</p>
        </div>

        {/* Dynamic Rows */}
        <div className="min-w-[800px]">
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <AssigmentRow
                key={index}
                name={assignment.name}
                title={assignment.title}
                
                status={assignment.status}
              />
            ))
          ) : (
            <p className="text-gray-500 py-4">No assignments available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionStatusWidget;
