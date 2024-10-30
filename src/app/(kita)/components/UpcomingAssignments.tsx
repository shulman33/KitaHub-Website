import EmptyState from "@/app/(marketing)/components/empty-state";
import React from "react";

interface CountdownProps {
  hours: string;
  minutes: string;
  seconds: string;
  showDays?: boolean;
  days?: string;
}

const Countdown: React.FC<CountdownProps> = ({
  hours,
  minutes,
  seconds,
  showDays = false,
  days,
}) => {
  return (
    <div className="flex flex-col items-center whitespace-nowrap rounded">
      <div className="flex gap-2 text-xs">
        {showDays && <div>Days</div>}
        <div>Hours</div>
        <div>Minutes</div>
        {!showDays && <div>Seconds</div>}
      </div>
      <div className="flex gap-1 mt-1.5 text-base font-semibold items-center">
        {showDays && (
          <>
            <div className="px-2 py-1 bg-blue-50 rounded">{days}</div>
            <div className="mx-1">:</div>
          </>
        )}
        <div className="px-2 py-1 bg-blue-50 rounded">{hours}</div>
        <div className="mx-1">:</div>
        <div className="px-2 py-1 bg-blue-50 rounded">{minutes}</div>
        {!showDays && (
          <>
            <div className="mx-1">:</div>
            <div className="px-2 py-1 bg-blue-50 rounded">{seconds}</div>
          </>
        )}
      </div>
    </div>
  );
};

interface AssignmentItemProps {
  course: string;
  title: string;
  countdown: CountdownProps;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({
  course,
  title,
  countdown,
}) => {
  return (
    <div className="flex flex-wrap items-center pb-4 mt-5 w-full border-b border-blue-600 border-opacity-10 text-slate-900">
      <div className="flex items-center w-full md:w-auto text-base font-medium">
        <div className="flex items-center mr-4">
          <div>{course}</div>
        </div>
        <div>{title}</div>
      </div>
      <div className="ml-auto mt-2 md:mt-0">
        <Countdown {...countdown} />
      </div>
    </div>
  );
};

interface UpcomingAssignmentsProps {
  assignments: AssignmentItemProps[];
}

const UpcomingAssignments: React.FC<UpcomingAssignmentsProps> = ({
  assignments,
}) => {
  return (
    <section className="flex flex-col px-5 pt-6 bg-white rounded-2xl max-w-[645px]">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-base font-bold text-slate-900">
          🗂️ Upcoming Assignments
        </h2>
        <a href="#" className="text-sm font-semibold text-slate-500">
          View All
        </a>
      </header>
      {assignments.length > 0 && (
        <div className="flex items-center mt-5 w-full text-base font-semibold text-slate-900">
          <div className="flex w-full md:w-auto">
            <div className="mr-4">Course</div>
            <div>Title</div>
          </div>
          <div className="ml-auto">Deadline</div>
        </div>
      )}
      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <AssignmentItem key={index} {...assignment} />
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
    </section>
  );
};

const assignmentsData: AssignmentItemProps[] = [
  {
    course: "Medieval History",
    title: "Answer Writing",
    countdown: { hours: "02", minutes: "56", seconds: "02" },
  },
  {
    course: "Mathematics III",
    title: "Multiple Choice Q...",
    countdown: {
      hours: "56",
      minutes: "02",
      seconds: "00",
      showDays: true,
      days: "02",
    },
  },
  {
    course: "English Lesson",
    title: "Question & Answer",
    countdown: { hours: "02", minutes: "56", seconds: "02" },
  },
  {
    course: "Mathematics III",
    title: "Multiple Choice Q...",
    countdown: { hours: "02", minutes: "56", seconds: "02" },
  },
];

export const UpcomingAssignmentsWrapper: React.FC = () => {
  return <UpcomingAssignments assignments={assignmentsData} />;
};
