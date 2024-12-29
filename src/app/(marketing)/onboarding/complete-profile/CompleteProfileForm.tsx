"use client";

import React from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import CheckboxInput from "./CheckboxInput";
import FormActions from "./FormActions";
import FormSection from "./FormSection";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { StateType, SearchParams } from "../../lib/types";
import { validateEmail, validateProfileData } from "@/app/(kita)/lib/utils";
import { updateProfile } from "@/app/api/updateProfile";


interface CompleteProfileFormProps {
  sessionToken: string;
  stateParam: string;
}

export function CompleteProfileForm({
  sessionToken,
  stateParam,
}: CompleteProfileFormProps) {
  const initialState: StateType = {};

  async function handleSubmit(
    state: StateType,
    formData: FormData
  ): Promise<StateType> {
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const universityEmail = formData.get("universityEmail")?.toString() || "";
    const role = formData.get("role")?.toString() || "";
    const agree = formData.get("agree") === "on";

    // Validate form data
    const validation = validateProfileData({
      firstName,
      lastName,
      universityEmail,
      role,
      agree,
    });

    if (!validation.isValid) {
      return { message: validation.error };
    }

    try {
      const response = await updateProfile({
        session_token: sessionToken,
        firstName,
        lastName,
        acceptedTOS: agree,
        universityEmail,
        isProfessor: role === "professor",
      });

      return {
        redirectUrl: `${
          process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
        }/continue?state=${encodeURIComponent(stateParam)}`,
      };
    } catch (error) {
      return {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  }

  const [state, formAction] = useFormState(handleSubmit, initialState);

  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <div className="bg-gray-50 space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <FormSection
          title="Complete Your Profile"
          description="Please provide your information to complete your registration."
        />

        <form
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          action={formAction}
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                id="firstName"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                required
              />

              <TextInput
                id="lastName"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                required
              />

              <div className="col-span-full">
                <TextInput
                  id="universityEmail"
                  name="universityEmail"
                  label="University Email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="col-span-full">
                <RadioGroup
                  legend="Join as:"
                  description="Select your role at the university"
                  name="role"
                  options={[
                    { id: "professor", value: "professor", label: "Professor" },
                    { id: "student", value: "student", label: "Student" },
                  ]}
                  required
                />
              </div>

              <div className="col-span-full">
                <CheckboxInput
                  id="agree"
                  name="agree"
                  label="I accept the"
                  linkText="Terms of Service"
                  linkHref="/terms"
                  required
                />
              </div>
            </div>
          </div>

          <FormActions />

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
