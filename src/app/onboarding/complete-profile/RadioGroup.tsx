import React from 'react';

interface RadioOption {
  id: string;
  value: string;
  label: string;
}

interface RadioGroupProps {
  legend: string;
  description: string;
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  legend,
  description,
  options,
  name,
  value,
  onChange,
}) => (
  <fieldset>
    <legend className="text-sm font-semibold leading-6 text-gray-900">
      {legend}
    </legend>
    <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
    <div className="mt-6 space-y-6">
      {options.map((option) => (
        <div className="flex items-center gap-x-3" key={option.id}>
          <input
            id={option.id}
            name={name}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="h-4 w-4 border-gray-300 text-accent-purple focus:ring-accent-purple"
            required
          />
          <label
            htmlFor={option.id}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default RadioGroup;
