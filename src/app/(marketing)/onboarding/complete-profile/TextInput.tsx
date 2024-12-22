import React from "react";

export interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
}) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={autoComplete}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-purple sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default TextInput;
