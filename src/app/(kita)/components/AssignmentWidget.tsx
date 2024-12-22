import React from 'react';
import CourseRow from './StudentComponents/CourseRow';
import EmptyState from '@/app/(marketing)/components/empty-state';
import { ExtendedSelectAssignment } from '../lib/types';

interface AssignmentWidgetProps {
  courses: ExtendedSelectAssignment[];
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

const AssignmentWidget: React.FC<AssignmentWidgetProps> = ({ courses }) => {
  return (
    <div className="bg-white max-w-full scrollbar-custom p-[16px] sm:p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      <div className="flex justify-between items-center">
        <p className="text-[16px] leading-[19.5px] font-bold">
          🗂️ Upcoming Assignments
        </p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
          View All
        </button>
      </div>
      {/* Table Header */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 border-b-[1px] w-full border-[#2165FF]/8 gap-[30px] py-[16px] justify-between font-semibold text-[16px] text-secondary leading-[19.5px] min-w-[600px]">
          <p>Course</p>
          <p>Title</p>
          <p>Deadline</p>
        </div>
        {/* Dynamic Course Rows */}
        <div className="min-w-[600px]">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <CourseRow
                key={index}
                courseName={course.className}
                title={course.title}
                timeToDeadline={course.timeToDeadlineObject}
              />
            ))
          ) : (
            <EmptyState
              icon={<BlankPaperIcon />}
              title="No Courses Available"
              text="Get started by enrolling in a new course"
              buttonText="Enroll Now"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentWidget;
