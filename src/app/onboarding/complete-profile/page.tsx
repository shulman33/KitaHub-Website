import React from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import CheckboxInput from "./CheckboxInput";
import FormActions from "./FormActions";
import FormSection from "./FormSection";

const Example: React.FC = () => {
  // TODO: Check if user is logged in and has the meta data and if so, redirect to the /dashboard

  const radioOptions = [
    { id: "prof", value: "professor", label: "Professor" },
    { id: "student", value: "student", label: "Student" },
  ];

  return (
    <div className="bg-gray-50 space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <FormSection
          title="Welcome to KitaHub! Let’s Get to Know You Better"
          description="Please fill out the following information to personalize your experience and connect with the community. Your privacy is our priority."
        />

        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                id="first-name"
                name="first-name"
                label="First name"
                autoComplete="given-name"
              />

              <TextInput
                id="last-name"
                name="last-name"
                label="Last name"
                autoComplete="family-name"
              />

              <TextInput
                id="university"
                name="university"
                label="University"
                autoComplete="organization"
              />

              <TextInput
                id="uni-email"
                name="uni-email"
                label="University Email"
                type="email"
                autoComplete="email"
              />

              <div className="max-w-2xl space-y-10 md:col-span-3">
                <RadioGroup
                  legend="Join KitaHub as a:"
                  description="Select your role to connect with the right tools and community members."
                  options={radioOptions}
                  name="role"
                />

                <CheckboxInput
                  id="agree"
                  name="agree"
                  label="I accept the"
                  linkText="Terms of Service"
                  linkHref="/terms"
                />
              </div>
            </div>
          </div>
          <FormActions />
        </form>
      </div>
    </div>
  );
};

export default Example;
