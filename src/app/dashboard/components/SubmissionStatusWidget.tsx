import React from "react";
import EmptyState from "@/app/ui/empty-state";

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
    <section className="flex flex-col justify-center p-6 bg-white rounded-2xl shadow-[0px_4px_45px_rgba(13,108,255,0.08)] max-md:px-5">
      <div className="flex flex-col w-full max-md:max-w-full">
        <header className="flex flex-wrap gap-5 justify-between w-full font-semibold rounded-lg max-md:max-w-full">
          <StatusButton />
          <button className="my-auto text-sm text-slate-500">View All</button>
        </header>
        <div className="flex flex-col mt-6 w-full max-md:max-w-full">
          {assignments.length > 0 && (
            <div className="flex flex-wrap gap-10 items-center pb-4 w-full text-base font-semibold border-b border-blue-600 border-opacity-10 max-w-[667px] text-slate-900 max-md:max-w-full">
              <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
                <div className="flex gap-10 items-center self-stretch my-auto whitespace-nowrap min-w-[240px] w-[280px]">
                  <div className="self-stretch my-auto">Assignments</div>
                  <div className="self-stretch my-auto">Title</div>
                </div>
                <div className="self-stretch my-auto">Due Date</div>
              </div>
              <div className="self-stretch my-auto">Status</div>
            </div>
          )}
          <div className="flex flex-col mt-4 w-full max-md:max-w-full">
            {/* {assignments.map((assignment, index) => (
              <AssignmentRow key={index} {...assignment} />
            ))} */}
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <AssignmentRow key={index} {...assignment} />
              ))
            ) : (
              <EmptyState
                title="No Assignments Yet!"
                text="Need to join a class?"
                buttonText="Join a Class"
                icon={
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
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionStatusWidget;
