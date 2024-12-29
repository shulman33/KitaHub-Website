"use client";

import Image from "next/image";
import TextField from "@/app/(marketing)/components/text-field";
import DropdownInput from "./dropdown";
import { options, contactFields } from "@/app/(marketing)/lib/content";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    name: "",
    email: "",
    phone: "",
    university: "",
    role: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDropdownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  return (
    <div
      className="isolate bg-off-white px-6 py-24 sm:py-32 lg:px-8"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-midnight-blue sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Got Questions? Our Team Is Ready to Assist You Every Step of the Way!
        </p>
      </div>
      <form
        action="/about-us"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-y-6">
            {contactFields.map((field) => (
              <TextField
                key={field.id}
                label={field.label}
                id={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-y-6">
            <DropdownInput
              label="Role"
              options={options}
              selectedOption={formData.role}
              onOptionSelect={handleDropdownChange}
            />
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Message"
              className="block w-full rounded-md px-3.5 py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-accent-purple"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="flex items-center justify-center rounded-md bg-accent-purple px-12 py-4 text-white text-center text-sm font-semibold hover:bg-accent-purple-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-purple-hover"
          >
            <span className="mr-2">Send</span>
            <Image src="/white-arrow.svg" width={28} height={28} alt="Logo" />
          </button>
        </div>
      </form>
      <div className="mt-12 max-w-xl mx-auto justify-center text-center">
        <p>
          For more information, explore our{" "}
          <span>
            <Link href="/help" className="text-primary underline">
              Help Center
            </Link>
          </span>{" "}
          or fill out our{" "}
          <span>
            <Link href="#contact" className="text-primary underline">
              Contact Form
            </Link>
          </span>
          , and we&apos;ll get back to you promptly. At Kitahub, we&apos;re
          committed to providing you with the best experience possible.
        </p>
      </div>
    </div>
  );
}
