// nav-links.tsx
"use client";

import React from "react";
import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLinksProps } from "@/app/(marketing)/lib/types";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Demo Class", href: "/demo-class" },
  { name: "Faq", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
  { name: "Help", href: "/help" },
];

export default function NavLinks({
  isMobile = false,
  closeMobileMenu,
  session,
}: NavLinksProps & { session: any }) {

  const buttonText = session ? "My Dashboard" : "Get Started";

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col space-y-6" : "items-center justify-between w-full"
      }`}
    >
      <div
        className={`flex ${
          isMobile ? "justify-between items-center" : "flex-1"
        }`}
      >
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">KitaHub</span>
          <Image
            alt="KitaHub Logo"
            src="/logo-navbar.svg"
            className="h-12 sm:h-11 w-auto"
            width={150}
            height={48}
          />
        </Link>
        {isMobile && (
          <>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div
        className={`${
          isMobile ? "space-y-2 py-6" : "hidden lg:flex lg:gap-x-12"
        }`}
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block text-base font-normal leading-6 text-gray-900 hover:bg-gray-50 ${
              isMobile ? "-mx-3 rounded-lg px-3 py-2" : ""
            }`}
            onClick={isMobile ? closeMobileMenu : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {!isMobile && (
        <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6">
          <Button
            href="/api/auth/login?returnTo=/dashboard"
            text={buttonText}
            variant="secondary"
            border={true}
            textColor="accent-purple"
            textSize="text-sm"
          />
        </div>
      )}

      {isMobile && (
        <div className="py-6">
          <Link
            href="/api/auth/login?returnTo=/dashboard"
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );
}
