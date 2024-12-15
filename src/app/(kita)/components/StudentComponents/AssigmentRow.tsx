import React from "react";
import Counter from "./Counter";

interface AssigmentRowProps {
  name: string;
  title: string;
  dueDate: string;
  status: string;
}

const AssigmentRow: React.FC<AssigmentRowProps> = ({
  name,
  title,
  status,
}) => {
  return (
    <div className="flex w-full gap-[10px] my-[16px] shadow-md rounded-[8px] justify-between text-[14px] font-medium leading-[19.5px] border-b-[1px] border-[#2165FF]/8 py-[8px] items-center p-[10px] text-secondary">
      {/* Assignment Name */}
      <p className="text-[16px] flex-shrink-0 font-medium leading-[19.5px]">
        {name}
      </p>
      {/* Title */}
      <p className="flex-shrink-0">{title}</p>
      {/* Counter for Due Date */}
      <Counter  />
      {/* Status */}
      <p className="flex-shrink-0">{status}</p>
    </div>
  );
};

export default AssigmentRow;
