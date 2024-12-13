import React from "react";
import EmptyState from "@/app/(marketing)/components/empty-state";
import CalendarComponent from "./StudentComponents/CalendarComponent";
import CourseRow from "./StudentComponents/CourseRow";
import SubmissionStatusButton from "./StudentComponents/SubmissionStatusButton";
import AssigmentRow from "./StudentComponents/AssigmentRow";
interface Assignment {
  title: string;
  dueDate: string;
  status: "Submitted" | "In Progress" | "Not Started";
}

const assignments: Assignment[] = [
  // { title: "Answer Writing", dueDate: "02:56:02", status: "Submitted" },
  // { title: "Answer Writing", dueDate: "02:56:02", status: "In Progress" },
  // { title: "Answer Writing", dueDate: "00:00:00", status: "Not Started" },
];

interface StatusButtonProps {}

const StatusButton: React.FC<StatusButtonProps> = () => {
  return (
    <button className="flex gap-2.5 justify-center items-center px-8 py-4 text-base text-white bg-blue-600 rounded-lg max-md:px-5">
      <span className="self-stretch my-auto">Submission Status</span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4f0b0f67e6fdd782259eb9c3e08886d3a3bbccb671dd90a63bc2560fbbf02f7?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        alt=""
      />
    </button>
  );
};

interface TimerProps {
  dueDate: string;
}

const Timer: React.FC<TimerProps> = ({ dueDate }) => {
  const [hours, minutes, seconds] = dueDate.split(":");
  return (
    <div className="flex flex-col self-stretch my-auto whitespace-nowrap rounded w-[131px]">
      <div className="flex gap-3.5 text-xs max-md:mr-0.5">
        <div>Hours</div>
        <div>Minutes</div>
        <div>Seconds</div>
      </div>
      <div className="flex gap-1 mt-1.5 text-base font-semibold">
        <div className="px-2 py-1 text-center bg-blue-50 rounded">{hours}</div>
        <div className="my-auto">:</div>
        <div className="px-2 py-1 text-center bg-blue-50 rounded">
          {minutes}
        </div>
        <div className="my-auto">:</div>
        <div className="px-2 py-1 text-center bg-blue-50 rounded">
          {seconds}
        </div>
      </div>
    </div>
  );
};

interface AssignmentRowProps {
  title: string;
  dueDate: string;
  status: "Submitted" | "In Progress" | "Not Started";
}

const AssignmentRow: React.FC<AssignmentRowProps> = ({
  title,
  dueDate,
  status,
}) => {
  return (
    <div className="flex flex-col justify-center p-2.5 w-full bg-white rounded-lg shadow-[0px_4px_45px_rgba(13,108,255,0.08)] max-md:max-w-full mb-4 border-b border-blue-600 border-opacity-10">
      <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-center self-stretch my-auto min-w-[240px] text-slate-900 max-md:max-w-full">
          <div className="flex gap-10 items-center self-stretch my-auto text-base font-medium min-w-[240px]">
            <div className="self-stretch my-auto">Assignments</div>
            <div className="self-stretch my-auto">{title}</div>
          </div>
          <Timer dueDate={dueDate} />
        </div>
        <div
          className={`self-stretch my-auto text-base font-medium ${
            status === "Submitted" ? "text-green-600" : ""
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

const SubmissionStatusWidget: React.FC = () => {
  return (
   <>

<div className='bg-white p-[24px] w-full h-full rounded-[16px]  overflow-y-auto'>
      <div className="flex justify-between items-center">
        <SubmissionStatusButton/>
        <button className='text-[14px] leading-[17px] text-[#74759A] font-semibold'>View All</button>
      </div>
      <div className=' flex w-full justify-between max-w-full border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px]  font-semibold  text-[16px] text-secondary leading-[19.5px]'>
         <p>Assignments</p>
         <p>Title</p>
         <p>Due Date</p>
         <p>Status</p>

       
    </div>
    <AssigmentRow/>
    <AssigmentRow/>
    <AssigmentRow/>
    <AssigmentRow/>
    </div>
   </>
  );
};

export default SubmissionStatusWidget;
