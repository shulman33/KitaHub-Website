import React from "react";
import Question from "./Question";
import Answers from "./Answers";
import { AnswerType } from "../../lib/types";
import Image from "next/image";

export const SearchFilter = () => {
  return (
    <div className="bg-white pl-[21px] pb-[21px] pt-[24px] pr-[24px] border-b border-[#0D6CFF14]">
      <div className="border p-[9px] rounded-[4px] flex justify-between items-center border-[#0D6CFF14]">
        <input
          type="text"
          className="w-full text-black"
          placeholder="Enter here"
        />
        <div className="bg-darkBlue w-fit p-[9px] rounded-[4px]">
          <Image src="/search2.svg" width={24} height={24} alt="search" />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-[21px] items-center">
        <Image src="/filter.svg" width={20} height={20} alt="filters" />
        <p className="text-[16px] font-bold leading-[19px]">Filter</p>
      </div>
    </div>
  );
};

interface QuestionType {
  title: string;
  description: string;
  tags: string[];
  stats: { messages: number; likes: number };
}

interface QuestionsListProps {
  pinnedQuestion: QuestionType;
  weeklyQuestions: QuestionType[];
}

export const QuestionsList = ({
  pinnedQuestion,
  weeklyQuestions,
}: QuestionsListProps) => {
  return (
    <>
      <div>
        <div className="flex items-center mb-[16px] pl-[24px] gap-2 mt-[24px]">
          <Image src="/pin.svg" width={16} height={16} alt="no image" />
          <p className="text-[16px] leading-[21px] font-bold text-secondary">
            Pinned
          </p>
        </div>
        <Question {...pinnedQuestion} />
      </div>
      <div>
        <div className="flex items-center mb-[16px] pl-[24px] gap-2 mt-[24px]">
          <p className="text-[16px] leading-[21px] font-bold text-secondary">
            This Week
          </p>
        </div>
        {weeklyQuestions.map((q, index) => (
          <Question key={index} {...q} />
        ))}
      </div>
    </>
  );
};

interface AnswersListProps {
  answers: AnswerType[];
}

export const AnswersList = ({ answers }: AnswersListProps) => {
  return (
    <div className="mt-[50px]">
      <p className="text-secondary border-t border-[#0D6CFF14] pt-[30px] font-semibold text-[16px] leading-[19px]">
        {answers.length} Answers
      </p>
      <div>
        {answers.map((answer, index) => (
          <>
            <Answers key={index} {...answer} />
            {index === 0 && (
              <div className="ml-[50px] md:ml-[101px]">
                <Answers key={index * 9 + 1} {...answer} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
