// components/Form/FormSection.tsx
import React from "react";

interface FormSectionProps {
  title: string;
  description: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description }) => (
  <div className="px-4 sm:px-6">
    <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
  </div>
);

export default FormSection;
