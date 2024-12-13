import React from "react";
import { TextFieldProps } from "@/app/(marketing)/lib/types";

export default function TextField({
  label,
  id,
  type,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <div className="flex flex-col text-base text-center whitespace-nowrap rounded w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-stone-300">
      {/* Focus-within to apply styles when input inside is focused */}
      <div className="px-3.5 py-5 w-full bg-white rounded focus-within:outline focus-within:outline-2 focus-within:outline-accent-purple">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="w-full bg-transparent text-base text-start text-gray-900 placeholder-gray-500 focus:outline-none"
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
