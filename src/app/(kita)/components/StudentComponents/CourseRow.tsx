import React from 'react';
import Counter from './Counter';

interface CourseRowProps {
  courseName: string;
  title: string;
}

const CourseRow: React.FC<CourseRowProps> = ({ courseName, title }) => {
  return (
    <div className="grid grid-cols-3 border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px] justify-between items-center text-[16px] text-secondary leading-[19.5px]">
      {/* Course */}
      <p className="text-[16px] flex-shrink-0">{`🗂️ ${courseName}`}</p>
      {/* Title */}
      <p className="flex-shrink-0">{title}</p>
      {/* Deadline Counter */}
      <Counter  />
    </div>
  );
};

export default CourseRow;
