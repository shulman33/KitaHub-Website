"use client";

import React, { useState } from "react";
import DesktopSidebar from "@/app/(kita)/components/DesktopSidebar";
import MobileSidebar from "@/app/(kita)/components/MobileSidebar";
import TopNavBar from "@/app/(kita)/components/TopNavBar";
import { ExtendedClass } from "../lib/types";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  classes: ExtendedClass[];
};

export default function ClientLayout({ children, classes }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      current: pathname === "/dashboard",
    },
    {
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: DocumentTextIcon,
      current: pathname === "/dashboard/assignments",
    },
    {
      name: "Discussions",
      href: "/dashboard/discussions",
      icon: ChatBubbleLeftRightIcon,
      current: pathname === "/dashboard/discussions",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
      current: pathname === "/dashboard/profile",
    },
    {
      name: "Courses",
      href: "#",
      icon: AcademicCapIcon,
      current: pathname.startsWith("/dashboard/classes"),
      children: classes.map((cls) => ({
        name: `${cls.className}`,
        href: `/dashboard/${cls.id}`,
        current: pathname === `/dashboard/${cls.id}`,
      })),
    },
  ];

  // Flatten navigation for mobile view
  const mobileNavigation = [
    ...navigation.slice(0, -1),
    ...classes.map((cls) => ({
      name: `${cls.className}`,
      href: `/dashboard/${cls.id}`,
      icon: AcademicCapIcon,
      current: pathname === `/dashboard/${cls.id}`,
    })),
    {
      name: "Logout",
      href: "/api/auth/logout",
      icon: UserIcon,
      current: false,
    },
  ];

  const userNavigation = [
    { name: "Your profile", href: "/dashboard/profile" },
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
        <main className="bg-[#FAFAFA] py-10 px-[20px] sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}
