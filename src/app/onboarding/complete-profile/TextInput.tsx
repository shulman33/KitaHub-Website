import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  name,
  type = "text",
  autoComplete = "off",
  value,
  onChange,
}) => (
  <div className="sm:col-span-3">
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm 
             ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
             focus:ring-2 focus:ring-inset focus:ring-accent-purple focus:outline-none sm:text-sm sm:leading-6"
        required
      />
    </div>
  </div>
);

export default TextInput;
