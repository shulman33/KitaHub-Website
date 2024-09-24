// components/Form/FormActions.tsx
import React from "react";

const FormActions: React.FC = () => (
  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
    <button
      type="submit"
      className="rounded-md bg-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm 
                 hover:bg-accent-purple-hover focus-visible:outline focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-accent-purple"
    >
      Submit
    </button>
  </div>
);

export default FormActions;
