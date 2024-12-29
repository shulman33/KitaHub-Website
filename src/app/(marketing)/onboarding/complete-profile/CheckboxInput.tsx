import React from "react";

interface CheckboxInputProps {
  id: string;
  name: string;
  label: string;
  linkText?: string;
  linkHref?: string;
  required?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  name,
  label,
  linkText,
  linkHref,
  required = false,
}) => {
  return (
    <div className="relative flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          className="h-4 w-4 rounded border-gray-300 text-accent-purple focus:ring-accent-purple"
        />
      </div>
      <div className="text-sm leading-6">
        <div className="flex items-center">
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}
          </label>
          {linkText && linkHref && (
            <a
              href={linkHref}
              className="ml-1 font-medium text-accent-purple hover:text-accent-purple-hover"
            >
              {linkText}
            </a>
          )}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      </div>
    </div>
  );
};

export default CheckboxInput;
