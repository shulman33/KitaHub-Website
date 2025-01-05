import { getMessagesByClassId } from "@/app/(kita)/server/actions/messageActions";
import React from "react";
import { SearchFilter } from "@/app/(kita)/components/QAComponents/discussions";
import { QuestionsList } from "@/app/(kita)/components/QAComponents/discussions";


interface PageProps {
  params?: {
    classId: string;
  };
}

export default function DiscussionsPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Select a discussion to view details</p>
    </div>
  );
}

// const DiscussionsPage =  () => {
//   // Dummy Data - In real app, this would come from an API or database
//   const pinnedQuestion = {
//     title: "Medieval History",
//     description:
//       "This expedient serves to get an idea of the finished product that will soon be printed or disseminated via digital channels...",
//     tags: ["General", "Scott Maxwell", "4h"],
//     stats: { messages: 8, likes: 8 },
//   };

//   const weeklyQuestions = [
//     {
//       title: "World War II",
//       description: "Discuss the causes of World War II in Europe and Asia...",
//       tags: ["History", "John Smith", "6h"],
//       stats: { messages: 5, likes: 10 },
//     },
//     {
//       title: "Cold War",
//       description: "Analyze the role of the United States and Soviet Union...",
//       tags: ["Politics", "Jane Doe", "1d"],
//       stats: { messages: 3, likes: 7 },
//     },
//   ];

//   return (
//     <div className="bg-white max-h-screen overflow-y-auto">
//       <SearchFilter />
//       <QuestionsList
//         pinnedQuestion={pinnedQuestion}
//         weeklyQuestions={weeklyQuestions}
//       />
//     </div>
//   );
// };

// export default DiscussionsPage
// export default DiscussionsPage;

// export default withPageAuthRequired(async function DiscussionsPage({
//   params,
// }: PageProps) {
//   if (!params?.classId) {
//     notFound();
//   }
//   const session = await getSession();

//   if (!session || !session.user) {
//     throw new Error("User is not authenticated");
//   }

//   const messages = await getMessagesByClassId(params.classId);
//   if (!messages) notFound();

//   const pinnedQuestion = {
//     title: "Medieval History",
//     description:
//       "This expedient serves to get an idea of the finished product that will soon be printed or disseminated via digital channels...",
//     tags: ["General", "Scott Maxwell", "4h"],
//     stats: { messages: 8, likes: 8 },
//   };

//   const weeklyQuestions = [
//     {
//       title: "World War II",
//       description: "Discuss the causes of World War II in Europe and Asia...",
//       tags: ["History", "John Smith", "6h"],
//       stats: { messages: 5, likes: 10 },
//     },
//     {
//       title: "Cold War",
//       description: "Analyze the role of the United States and Soviet Union...",
//       tags: ["Politics", "Jane Doe", "1d"],
//       stats: { messages: 3, likes: 7 },
//     },
//   ];

//   return (
//     <div className="bg-white max-h-screen overflow-y-auto">
//       <SearchFilter />
//       <QuestionsList
//         pinnedQuestion={pinnedQuestion}
//         weeklyQuestions={weeklyQuestions}
//       />
//     </div>
//   );
// });
