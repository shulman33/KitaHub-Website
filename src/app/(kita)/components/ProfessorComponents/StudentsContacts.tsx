import React from 'react';
import StudentContactCard from './elements/StudentContactCard';

interface Student {
  name: string;
  performance: string;
  grade: string;
}

interface StudentsContactsProps {
  students: Student[];
}

const StudentsContacts: React.FC<StudentsContactsProps> = ({ students }) => {
  return (
    <div className="p-[24px] max-h-[378px] rounded-[16px] overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between mb-[16px] items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">🎓 Students</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px]">{students.length} Active</p>
        </div>
      </div>

      {/* Dynamic Student Cards */}
      {students.map((student, index) => (
        <StudentContactCard
          key={index}
          name={student.name}
          performance={student.performance}
          grade={student.grade}
        />
      ))}
    </div>
  );
};

export default StudentsContacts;
