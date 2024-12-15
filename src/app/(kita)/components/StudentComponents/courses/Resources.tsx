import React from 'react';
import ResourceCard from './ResourceCard';

interface Resource {
  date: string;
  title: string;
  downloadLink: string;
}

interface ResourcesProps {
  resources: Resource[];
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  return (
    <div className="p-[24px] rounded-[16px] bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px] leading-[19px] font-bold">Resources</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px]">+ New Discussion</p>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex mt-[22px] pb-[8px] justify-between border-b border-[#0D6CFF14/8] items-center">
        <p className="text-darkBlue">Lecture Slides</p>
        <p className="text-lightGray">Materials</p>
      </div>

      {/* Dynamic Resource Cards */}
      <div className="flex flex-col max-h-[220px] overflow-y-auto">
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <ResourceCard
              key={index}
              date={resource.date}
              title={resource.title}
              downloadLink={resource.downloadLink}
            />
          ))
        ) : (
          <p className="text-lightGray text-center mt-[16px]">
            No resources available.
          </p>
        )}
      </div>

      {/* Note */}
      <p className="text-[10px] leading-[12px] mt-[30px]">
        <span className="font-semibold">Note:</span> Be sure to regularly check this section for updates and newly added materials to support your studies.
      </p>
    </div>
  );
};

export default Resources;
