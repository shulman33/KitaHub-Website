"use client";

import React from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import CheckboxInput from "./CheckboxInput";
import FormActions from "./FormActions";
import FormSection from "./FormSection";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

interface StateType {
  message?: string;
  redirectUrl?: string;
}

interface CompleteProfileFormProps {
  action: (
    state: StateType,
    formData: FormData
  ) => StateType | Promise<StateType>;
}

export default function CompleteProfileForm({
  action,
}: CompleteProfileFormProps) {
  const initialState: StateType = {};
  const [state, formAction] = useFormState(action, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <div className="bg-gray-50 space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <FormSection
          title="Welcome to KitaHub! Let's Get to Know You Better"
          description="Please fill out the following information to personalize your experience and connect with the community. Your privacy is our priority."
        />

        <form
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          action={formAction}
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                id="first-name"
                name="firstName"
                label="First name"
                autoComplete="given-name"
              />

              <TextInput
                id="last-name"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
              />

              <div className="col-span-4">
                <TextInput
                  id="uni-email"
                  name="universityEmail"
                  label="University Email"
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div className="max-w-2xl space-y-10 md:col-span-3">
                <RadioGroup
                  legend="Join KitaHub as a:"
                  description="Select your role to connect with the right tools and community members."
                  options={[
                    { id: "prof", value: "professor", label: "Professor" },
                    { id: "student", value: "student", label: "Student" },
                  ]}
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

          <FormActions loading={pending} />

          {state.message && (
            <div className="px-4 py-2 sm:px-8">
              <p className="text-sm text-red-600">{state.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
