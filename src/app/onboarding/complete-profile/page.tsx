
'use client';

import React, { useState, FormEvent } from 'react';
import TextInput from './TextInput';
import RadioGroup from './RadioGroup';
import CheckboxInput from './CheckboxInput';
import FormActions from './FormActions';
import FormSection from './FormSection';
import { useSearchParams } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  university: string;
  universityEmail: string;
  role: string;
  agree: boolean;
}

const CompleteProfile: React.FC = () => {
  const searchParams = useSearchParams();

  const sessionToken = searchParams.get('session_token') || '';
  const state = searchParams.get('state') || '';

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    university: '',
    universityEmail: '',
    role: '',
    agree: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.universityEmail)) {
      setError('Please enter a valid university email address.');
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError('Please select your role.');
      setLoading(false);
      return;
    }

    if (!formData.agree) {
      setError('You must accept the Terms of Service.');
      setLoading(false);
      return;
    }

    try {
      // Make API call to /api/complete-profile
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_token: sessionToken,
          firstName: formData.firstName,
          lastName: formData.lastName,
          university: formData.university,
          universityEmail: formData.universityEmail,
          isProfessor: formData.role === 'professor',
        }),
      });

      // Check if the response is JSON
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response from the server.');
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setError('Invalid or expired session token. Please log in again.');
        } else {
          setError(data.error || 'Failed to update profile.');
        }
        throw new Error(data.error || 'Failed to update profile.');
      }

      // Redirect to /continue endpoint with the original state
      window.location.href = `https://${process.env.AUTH0_ISSUER_BASE_URL}/continue?state=${encodeURIComponent(
        state
      )}`;
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // If session_token is missing, display an error
  if (!sessionToken) {
    return (
      <div className="bg-gray-50 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Invalid Access</h1>
          <p>Missing session token. Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <FormSection
          title="Welcome to KitaHub! Let’s Get to Know You Better"
          description="Please fill out the following information to personalize your experience and connect with the community. Your privacy is our priority."
        />

        <form
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          onSubmit={handleSubmit}
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                id="first-name"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
              />

              <TextInput
                id="last-name"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />

              <TextInput
                id="university"
                name="university"
                label="University"
                autoComplete="organization"
                value={formData.university}
                onChange={handleChange}
              />

              <TextInput
                id="uni-email"
                name="universityEmail"
                label="University Email"
                type="email"
                autoComplete="email"
                value={formData.universityEmail}
                onChange={handleChange}
              />

              <div className="max-w-2xl space-y-10 md:col-span-3">
                <RadioGroup
                  legend="Join KitaHub as a:"
                  description="Select your role to connect with the right tools and community members."
                  options={[
                    { id: 'prof', value: 'professor', label: 'Professor' },
                    { id: 'student', value: 'student', label: 'Student' },
                  ]}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />

                <CheckboxInput
                  id="agree"
                  name="agree"
                  label="I accept the"
                  linkText="Terms of Service"
                  linkHref="/terms"
                  checked={formData.agree}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <FormActions loading={loading} />
          {error && (
            <div className="px-4 py-2 sm:px-8">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
