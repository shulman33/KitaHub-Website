import React from 'react';
import CourseRow from './StudentComponents/CourseRow';

interface Course {
  courseName: string;
  title: string;
 
}

interface CoursesWidgetProps {
  courses: Course[];
}

const CoursesWidget: React.FC<CoursesWidgetProps> = ({ courses }) => {
  return (
    <div className="bg-white max-w-full scrollbar-custom p-[16px] sm:p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
      <div className="flex justify-between items-center">
        <p className="text-[16px] leading-[19.5px] font-bold">🗂️ Upcoming Assignments</p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">View All</button>
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
                courseName={course.courseName}
                title={course.title}
              />
            ))
          ) : (
            <p className="text-gray-500 py-4">No courses available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesWidget;
