import React from "react";
import EmptyState from "@/app/(marketing)/components/empty-state";
import { ExtendedClass } from "../lib/types";
import Link from "next/link";


interface Course {
  id: string;
  courseName: string;
  instructor: string;
}

interface CoursesWidgetProps {
  courses: ExtendedClass[];
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

const CourseCard: React.FC<Course> = ({ courseName, instructor, id }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    {/* <h3 className="text-[16px] font-semibold text-gray-900 mb-2">{`📚 ${courseName}`}</h3> */}
    <Link
      href={`/dashboard/${id}`}
      className="text-[16px] font-semibold text-gray-900 mb-2"
    >
      {`📚 ${courseName}`}
    </Link>
    <p className="text-sm text-gray-500">{`Prof. ${instructor}`}</p>
  </div>
);

const CoursesWidget: React.FC<CoursesWidgetProps> = ({ courses }) => {
  return (
    <div className="bg-white max-w-full p-[16px] sm:p-[24px] rounded-[16px] max-h-[600px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[16px] leading-[19.5px] font-bold">📚 My Courses</p>
        <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
          Join a Course
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} id={course.id} courseName={course.className} instructor={course.professorName} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BlankPaperIcon />}
          title="No Courses Available"
          text="Get started by enrolling in a new course"
          buttonText="Enroll Now"
        />
      )}
    </div>
  );
};

export default CoursesWidget;