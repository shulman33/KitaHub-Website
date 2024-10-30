import EmptyState from "@/app/(marketing)/components/empty-state";
import React, { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface Discussion {
  id: string;
  author: string;
  avatarSrc: string;
  className: string;
  time: string;
  content: string;
  isActive: boolean;
}

interface DiscussionBoardProps {
  initialDiscussions: Discussion[];
}

const DiscussionBoardWidget: React.FC<DiscussionBoardProps> = ({
  initialDiscussions,
}) => {
  const [discussions, setDiscussions] =
    useState<Discussion[]>(initialDiscussions);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<"recent" | "active">("recent");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleFilter = () => {
    setFilterType(filterType === "recent" ? "active" : "recent");
  };

  const filteredDiscussions = discussions
    .filter(
      (discussion) =>
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterType === "recent") {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      } else {
        return b.isActive === a.isActive ? 0 : b.isActive ? 1 : -1;
      }
    });

  return (
    <section className="flex overflow-hidden flex-col px-6 pt-6 bg-white rounded-2xl border border-solid border-blue-600 border-opacity-10 max-w-[501px] max-md:px-5">
      <header className="flex gap-5 justify-between px-0.5 w-full max-w-[453px] max-md:max-w-full">
        <h1 className="text-base font-bold text-slate-900">
          💬 Discussion Board
        </h1>
        <button className="flex gap-1.5 text-sm font-semibold text-slate-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6481555b79eb43b30f8a1e5ab5153fcfd015e07a88e5c5ff0ce5f5dd7b5f6a96?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
            className="object-contain shrink-0 aspect-square w-[22px]"
            alt=""
          />
          <span>New Discussion</span>
        </button>
      </header>
      <main className="flex flex-col mt-6 w-full max-md:max-w-full">
        {filteredDiscussions.length > 0 && (
          <div className="flex gap-8 w-full rounded max-md:max-w-full">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <DiscussionFilter filterType={filterType} onToggle={toggleFilter} />
        </div>)}

        {filteredDiscussions.length > 0 ? (
          <ul>
            {filteredDiscussions.map((discussion) => (
              <DiscussionItem key={discussion.id} {...discussion} />
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No Discussions Yet"
            text="Start a Discussion"
            buttonText="New Discussion"
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
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            }
          />
        )}
      </main>
    </section>
  );
};

interface SearchBarProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex flex-col grow shrink-0 py-0.5 basis-0 w-fit">
      <label htmlFor="searchDiscussions" className="sr-only">
        Search Discussions
      </label>
      <input
        type="text"
        id="searchDiscussions"
        value={searchTerm}
        onChange={onSearch}
        placeholder="Search Discussions..."
        className="gap-2.5 self-stretch pt-3 pr-32 pb-3 pl-2.5 text-sm bg-blue-50 rounded text-slate-500 max-md:pr-5"
      />
      <div className="flex z-10 gap-2.5 justify-center items-center self-end px-1.5 -mt-9 w-8 h-8 bg-white rounded max-md:mr-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e1ba39f5c7b22ab9ace4d4aa2ff6adc61e3bb9938070386791032c7442b13b7?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
          className="object-contain self-stretch my-auto w-5 aspect-square"
          alt=""
        />
      </div>
    </div>
  );
};

interface DiscussionFilterProps {
  filterType: "recent" | "active";
  onToggle: () => void;
}

const DiscussionFilter: React.FC<DiscussionFilterProps> = ({
  filterType,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="flex gap-2.5 justify-center items-center p-2.5 text-sm font-semibold bg-blue-50 rounded text-slate-500"
    >
      <span className="self-stretch my-auto">
        {filterType === "recent" ? "Most Recent" : "Most Active"}
      </span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/80f3c54478d7b0e261d6a3309126d60ca166c65cb3c6ae960db8c8b596368003?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        alt=""
      />
    </button>
  );
};

interface DiscussionItemProps {
  author: string;
  avatarSrc: string;
  className: string;
  time: string;
  content: string;
  isActive: boolean;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({
  author,
  avatarSrc,
  className,
  time,
  content,
  isActive,
}) => {
  return (
    <li
      className={`flex gap-10 items-start px-2.5 py-4 ${
        isActive ? "bg-indigo-50" : "bg-white"
      } rounded-lg shadow-[0px_4px_45px_rgba(13,108,255,0.08)] max-md:max-w-full ${
        isActive ? "" : "mt-4"
      }`}
    >
      <div className="flex flex-col justify-center min-w-[240px]">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center self-start">
            <img
              loading="lazy"
              src={avatarSrc}
              className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[55px]"
              alt={`${author}'s avatar`}
            />
            <div className="flex flex-col self-stretch my-auto">
              <div className="flex flex-col justify-center">
                <div className="text-base font-semibold text-slate-900">
                  {author}
                </div>
                <div className="flex gap-5 items-start mt-2.5 text-xs font-medium text-slate-600">
                  <div
                    className={`gap-2.5 self-stretch px-1.5 py-1 ${
                      isActive ? "bg-white" : "bg-indigo-50"
                    } rounded`}
                  >
                    {className}
                  </div>
                  <div>{time}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2.5 text-base text-slate-600">{content}</p>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/900dc0ea12328655b316fdf6715855a55345976b757917aa4a47622823e52e91?placeholderIfAbsent=true&apiKey=94d444df7e334ff786d8d250ab815d08"
        className="object-contain shrink-0 w-1 aspect-[0.2]"
        alt=""
      />
    </li>
  );
};

export default DiscussionBoardWidget;
