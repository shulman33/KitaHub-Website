"use client";

import React, { useState } from "react";
import DesktopSidebar from "@/app/(kita)/components/DesktopSidebar";
import MobileSidebar from "@/app/(kita)/components/MobileSidebar";
import TopNavBar from "@/app/(kita)/components/TopNavBar";
import { usePathname } from "next/navigation"; // Import usePathname hook
import {
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  // Check if the route contains "qa"
  const isQARoute = pathname.includes("qa");

  const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Assignments", href: "#", icon: DocumentTextIcon, current: false },
    {
      name: "Discussions",
      href: "#",
      icon: ChatBubbleLeftRightIcon,
      current: false,
    },
    { name: "Profile", href: "#", icon: UserIcon, current: false },
    {
      name: "Courses",
      href: "#",
      icon: AcademicCapIcon,
      current: false,
      children: [
        {
          name: "Introduction to Algorithms",
          href: "/dashboard/classes/34554",
          current: false,
        },
        { name: "Systems Programming", href: "#", current: false },
      ],
    },
  ];

  const mobileNavigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Assignments", href: "#", icon: DocumentTextIcon, current: false },
    {
      name: "Discussions",
      href: "#",
      icon: ChatBubbleLeftRightIcon,
      current: false,
    },
    { name: "Profile", href: "#", icon: UserIcon, current: false },
    { name: "Courses", href: "#", icon: AcademicCapIcon, current: false },
    {
      name: "Logout",
      href: "/api/auth/logout",
      icon: UserIcon,
      current: false,
    },
  ];

  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "/api/auth/logout" },
  ];

  return (
    <>
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={mobileNavigation}
      />
      <DesktopSidebar navigation={navigation} />
      <div className="lg:pl-72">
        <TopNavBar
          setSidebarOpen={setSidebarOpen}
          userNavigation={userNavigation}
        />
        {/* Conditional Padding for QA Routes */}
        <main
          className={`bg-[#FAFAFA] ${isQARoute ? "py-0 px-0" : "py-10 px-[20px] sm:px-6 lg:px-8"}`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
