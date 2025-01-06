"use client";

import { Dispatch, SetStateAction } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  userNavigation: { name: string; href: string }[];
};

export default function TopNavBar({ setSidebarOpen, userNavigation }: Props) {
  const { user, error, isLoading } = useUser();

  const PlaceholderIcon = () => (
    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="h-full w-full text-gray-300"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );

  return (
    <div
      className="
        sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 
        border-b border-gray-200 
        mobile-gradient-bg sm:bg-white 
        px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8
      "
    >
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Image src="/hamburger-icon.png" width={28} height={28} alt="Menu" />
      </button>

      <div className="flex flex-1 gap-x-4 justify-end self-stretch lg:gap-x-6">
        <div className="sm:hidden flex items-center">
          <Image
            src="/white-kh-logo.svg"
            width={67}
            height={38}
            alt="Your Company"
          />
        </div>
        <div className="hidden sm:flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>

              {isLoading ? (
                <PlaceholderIcon />
              ) : error ? (
                <PlaceholderIcon />
              ) : user?.picture ? (
                <Image
                  alt={user.name ?? "User Avatar"}
                  src={user.picture}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full bg-gray-50"
                />
              ) : (
                <PlaceholderIcon />
              )}
              
              <span className="hidden lg:flex lg:items-center">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 text-gray-400"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={`block px-3 py-1 text-sm leading-6 text-gray-900 ${
                        active ? "bg-gray-50" : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
