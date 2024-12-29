import React from 'react';
import Image from 'next/image';
import InstructorInfoCard from './InstructorInfoCard';
import { ExtendedInstructor } from '@/app/(kita)/lib/types';

interface Instructor {
  name: string;
  university: string;
  phone: string;
  email: string;
}

interface InstructorInformationProps {
  instructors: ExtendedInstructor[];
}

const InstructorInformation: React.FC<InstructorInformationProps> = ({ instructors }) => {
  return (
    <div className="bg-white p-[16px] rounded-[16px] max-h-[240px] overflow-y-auto">
      {/* Header */}
      <div className="flex pb-[8px] border-[#0D6CFF14] border-b gap-[4px] items-center">
        <Image src="/info.svg" width={16} height={16} alt="info" />
        <p className="font-bold text-[16px] leading-[19px]">Instructor’s Information</p>
      </div>

      {/* Dynamic Instructor Cards */}
      <div className="flex flex-col gap-[16px] mt-[24px]">
        {instructors.length > 0 ? (
          instructors.map((instructor, index) => (
            <InstructorInfoCard
              key={index}
              name={`${instructor.firstName} ${instructor.lastName}`}
              email={instructor.email!}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-[16px]">No instructor information available.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorInformation;
