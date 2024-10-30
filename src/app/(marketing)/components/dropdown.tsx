"use client";
import { useState } from "react";
import { DropdownInputProps } from "@/app/(marketing)/lib/types";

export default function DropdownInput({
  label,
  options,
  selectedOption,
  onOptionSelect,
}: DropdownInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <button
        className="flex justify-between items-center w-full px-4 py-5 bg-white rounded text-slate-900 text-base focus-within:outline focus-within:outline-2 focus-within:outline-accent-purple"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption || label}</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/412be722e298b335c0b573aaf1e6eb510b2e7329762b8f3d81149d4aa0f7ec3f?apiKey=94d444df7e334ff786d8d250ab815d08&&apiKey=94d444df7e334ff786d8d250ab815d08"
          alt=""
          className={`w-4 h-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
              role="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
