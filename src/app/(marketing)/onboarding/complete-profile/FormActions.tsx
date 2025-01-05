"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const FormActions = () => {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      <button
        type="submit"
        disabled={pending}
        className={`rounded-md bg-accent-purple px-3 py-2 text-sm font-semibold text-white shadow-sm 
                   hover:bg-accent-purple-hover focus-visible:outline focus-visible:outline-2 
                   focus-visible:outline-offset-2 focus-visible:outline-accent-purple ${
                     pending ? "opacity-50 cursor-not-allowed" : ""
                   }`}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default FormActions;
