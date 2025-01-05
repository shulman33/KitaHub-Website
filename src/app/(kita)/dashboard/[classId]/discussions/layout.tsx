import React from "react";
import { SearchFilter } from "@/app/(kita)/components/QAComponents/discussions";
import { QuestionsList } from "@/app/(kita)/components/QAComponents/discussions";

export default function DiscussionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dummy data - would come from API/DB
  const pinnedQuestion = {
    title: "Medieval History",
    description:
      "This expedient serves to get an idea of the finished product...",
    tags: ["General", "Scott Maxwell", "4h"],
    stats: { messages: 8, likes: 8 },
  };

  const weeklyQuestions = [
    {
      title: "World War II",
      description: "Discuss the causes of World War II...",
      tags: ["History", "John Smith", "6h"],
      stats: { messages: 5, likes: 10 },
    },
    {
      title: "Cold War",
      description: "Analyze the role of the United States...",
      tags: ["Politics", "Jane Doe", "1d"],
      stats: { messages: 3, likes: 7 },
    },
  ];

  return (
    <div className="grid md:grid-cols-[40%,auto]">
      {/* Left Panel - Discussion List */}
      <div className="bg-white max-h-screen overflow-y-auto">
        <SearchFilter />
        <QuestionsList
          pinnedQuestion={pinnedQuestion}
          weeklyQuestions={weeklyQuestions}
        />
      </div>

      {/* Right Panel - Discussion Detail */}
      {children}
    </div>
  );
}
