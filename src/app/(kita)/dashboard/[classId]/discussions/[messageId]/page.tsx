import React from "react";
import InstructorQuestion from "@/app/(kita)/components/QAComponents/InstructorQuestion";
import { AnswersList } from "@/app/(kita)/components/QAComponents/discussions";

interface Props {
  params: {
    messageId: string;
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) => {
  const messageId = (await params).messageId;
  console.log("messageId", messageId);
  // Dummy Data - In real app, fetch based on messageId
  const instructorQuestion = {
    name: "Prof. Jane Smith",
    role: "Lectures - Ert3",
    question:
      "What were the major factors that led to the fall of the Roman Empire?",
    time: "34 Min Ago",
    stats: { messages: 8, likes: 8 },
  };

  const answersData = [
    {
      name: "Student 1",
      description:
        "The fall of the Roman Empire was caused by multiple factors...",
      role: "History Student",
      time: "1h Ago",
    },
    {
      name: "Student 2",
      description: "The economic instability was a critical issue...",
      role: "History Enthusiast",
      time: "2h Ago",
    },
  ];

  return (
    <div className="max-h-screen px-[20px] py-[30px] sm:p-[30px] overflow-y-auto">
      <InstructorQuestion {...instructorQuestion} />
      <AnswersList answers={answersData} />
    </div>
  );
};

export default Page;
