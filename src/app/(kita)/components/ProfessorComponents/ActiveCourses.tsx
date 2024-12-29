import React from 'react';
import ProfessorInfoCard from './elements/ProfessorInfoCard';

interface Course {
  courseName: string;
  professor: string;
  date: string;
  enrollmentCount: number;
  assignmentsCount: number;
  recentActivity: string;
}

interface ActiveCoursesProps {
  courses: Course[];
}

const ActiveCourses: React.FC<ActiveCoursesProps> = ({ courses }) => {
  return (
    <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">📚 Active Courses</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px]">+ New Course</p>
        </div>
      </div>

      {/* Dynamic Course Cards */}
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <ProfessorInfoCard
            key={index}
            courseName={course.courseName}
            professor={course.professor}
            date={course.date}
            enrollmentCount={course.enrollmentCount}
            assignmentsCount={course.assignmentsCount}
            recentActivity={course.recentActivity}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-[16px]">No active courses available.</p>
      )}
    </div>
  );
};

export default ActiveCourses;
