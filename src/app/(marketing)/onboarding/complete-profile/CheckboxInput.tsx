import React from 'react';
import Link from 'next/link';

interface CheckboxInputProps {
  id: string;
  name: string;
  label: string;
  linkText: string;
  linkHref: string;
  // checked: boolean;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  name,
  label,
  linkText,
  linkHref,
  // checked,
  // onChange,
}) => (
  <fieldset>
    <div className="mt-6 space-y-6">
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            // checked={checked}
            // onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 text-accent-purple focus:ring-accent-purple accent-accent-purple"
            required
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}{" "}
            <Link className="text-primary underline" href={linkHref}>
              {linkText}
            </Link>
          </label>
        </div>
      </div>
    </div>
  </fieldset>
);

export default CheckboxInput;
