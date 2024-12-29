import React from 'react';
import Question from '../../components/QAComponents/Question';
import InstructorQuestion from '../../components/QAComponents/InstructorQuestion';
import Answers from '../../components/QAComponents/Answers';
import Image from 'next/image';

const page = () => {
  // Dummy Data
  const pinnedQuestion = {
    title: 'Medieval History',
    description:
      'This expedient serves to get an idea of the finished product that will soon be printed or disseminated via digital channels...',
    tags: ['General', 'Scott Maxwell', '4h'],
    stats: { messages: 8, likes: 8 },
  };

  const weeklyQuestions = [
    {
      title: 'World War II',
      description: 'Discuss the causes of World War II in Europe and Asia...',
      tags: ['History', 'John Smith', '6h'],
      stats: { messages: 5, likes: 10 },
    },
    {
      title: 'Cold War',
      description: 'Analyze the role of the United States and Soviet Union...',
      tags: ['Politics', 'Jane Doe', '1d'],
      stats: { messages: 3, likes: 7 },
    },
  ];

  const instructorQuestion = {
    name: 'Prof. Jane Smith',
    role: 'Lectures - Ert3',
    question:
      'What were the major factors that led to the fall of the Roman Empire?',
    time: '34 Min Ago',
    stats: { messages: 8, likes: 8 },
  };

  const answersData = [
    {
      name: 'Student 1',
      description:
        'The fall of the Roman Empire was caused by multiple factors...',
      role: 'History Student',
      time: '1h Ago',
    },
    {
      name: 'Student 2',
      description: 'The economic instability was a critical issue...',
      role: 'History Enthusiast',
      time: '2h Ago',
    },
  ];

  return (
    <div className="grid md:grid-cols-[40%,auto]">
      {/* Left Panel */}
      <div className="bg-white max-h-screen overflow-y-auto">
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
        {/* Pinned */}
        <div>
          <div className="flex items-center mb-[16px] pl-[24px] gap-2 mt-[24px]">
            <Image src="/pin.svg" width={16} height={16} alt="no image" />
            <p className="text-[16px] leading-[21px] font-bold text-secondary">
              Pinned
            </p>
          </div>
          <Question {...pinnedQuestion} />
        </div>
        {/* Weekly Questions */}
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
      </div>
      {/* Right Panel */}
      <div className="max-h-screen px-[20px] py-[30px] sm:p-[30px] overflow-y-auto">
        <InstructorQuestion {...instructorQuestion} />
        {/* Answers */}
        <div className="mt-[50px]">
          <p className="text-secondary border-t border-[#0D6CFF14] pt-[30px] font-semibold text-[16px] leading-[19px]">
            {answersData.length} Answers
          </p>
          <div>
            {answersData.map((answer, index) => (
                <>
                
              <Answers key={index} {...answer} />
              {index==0&&

                <div className='ml-[50px] md:ml-[101px]'>
                   <Answers key={index*9+1} {...answer} />
                </div>
              }
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
