// import React from "react";
// import UpcomingAssignmentCard from "./UpcomingAssignmentCard";
// import PastAssignmentsCard from "./PastAssignmentsCard";
// import AssignmentsLinkCard from "./AssignmentsLinkCard";
// import EmptyState from "@/app/(marketing)/components/empty-state";
// import { ExtendedSelectAssignment } from "@/app/(kita)/lib/types";

// interface Assignment {
//   date: string;
//   status?: string;
//   subject: string;
//   grade?: string;
//   feedback?: string;
//   type: "upcoming" | "past" | "link";
// }

// interface AssignmentsProps {
//   assignments: ExtendedSelectAssignment[];
// }

// const AssignmentIcon = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className="mx-auto h-12 w-12 text-gray-400"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75m0-3.75h3.75M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15"
//       />
//     </svg>
//   );
// };

// const Assignments: React.FC<AssignmentsProps> = ({ assignments }) => {
//   const upcomingAssignments = assignments.filter((a) => a.type === "upcoming");
//   const pastAssignments = assignments.filter((a) => a.type === "past");
//   const assignmentLinks = assignments.filter((a) => a.type === "link");

//   const hasAssignments = assignments.length > 0;

//   return (
//     <div className="bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <p className="text-[16px] leading-[19.5px] font-bold">🗂️ Assignments</p>
//         {hasAssignments && (
//           <button className="text-[14px] leading-[17px] text-[#74759A] font-semibold">
//             View All
//           </button>
//         )}
//       </div>

//       {/* Content */}
//       {hasAssignments ? (
//         <div className="flex gap-[16px] overflow-x-auto mt-[16px]">
//           {/* Upcoming Assignments */}
//           {upcomingAssignments.length > 0 && (
//             <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
//               <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
//                 Upcoming Assignments
//               </p>
//               {upcomingAssignments.map((assignment, index) => (
//                 <UpcomingAssignmentCard
//                   key={index}
//                   date={assignment.date}
//                   status={assignment.status || "Pending"}
//                   subject={assignment.subject}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Past Assignments */}
//           {pastAssignments.length > 0 && (
//             <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
//               <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
//                 Past Assignments
//               </p>
//               {pastAssignments.map((assignment, index) => (
//                 <PastAssignmentsCard
//                   key={index}
//                   professor="Prof. Emily Davis"
//                   grade={assignment.grade || "N/A"}
//                   date={assignment.date}
//                   feedback={assignment.feedback || "No feedback available"}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Assignments Link */}
//           {assignmentLinks.length > 0 && (
//             <div className="bg-white p-[8px] flex-shrink-0 w-[221px] flex flex-col rounded-[8px] border border-[#0D6CFF14]">
//               <p className="text-[14px] font-medium text-lightGray pb-[8px] border-b mb-[16px]">
//                 Assignments Link
//               </p>
//               {assignmentLinks.map((assignment, index) => (
//                 <AssignmentsLinkCard
//                   key={index}
//                   subject={assignment.subject}
//                   date={assignment.date}
//                   link="#"
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="mt-[24px]">
//           <EmptyState
//             icon={<AssignmentIcon />}
//             title="No Assignments Yet"
//             text="Check back later for new assignments"
//             buttonText="Create Assignment"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Assignments;
