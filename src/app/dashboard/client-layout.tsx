"use client";

import React, { useState } from "react";
import DesktopSidebar from "./components/DesktopSidebar";
import MobileSidebar from "./components/MobileSidebar";
import TopNavBar from "./components/TopNavBar";
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
    { name: "Courses", href: "#", icon: AcademicCapIcon, current: false },
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
        <main className="bg-[#FAFAFA] py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
