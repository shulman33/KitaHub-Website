import React from "react";

interface RadioOption {
  id: string;
  value: string;
  label: string;
}

interface RadioGroupProps {
  legend: string;
  description?: string;
  name: string;
  options: RadioOption[];
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  legend,
  description,
  name,
  options,
  required = false,
}) => {
  return (
    <div>
      <div className="flex items-baseline">
        <legend className="text-sm font-medium leading-6 text-gray-900">
          {legend}
        </legend>
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>
      {description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      )}
      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              id={option.id}
              name={name}
              type="radio"
              value={option.value}
              required={required}
              className="h-4 w-4 border-gray-300 text-accent-purple focus:ring-accent-purple"
            />
            <label
              htmlFor={option.id}
              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
