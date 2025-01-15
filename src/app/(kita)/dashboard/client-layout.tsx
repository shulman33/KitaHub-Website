"use client";

import React, { useState, useEffect } from "react";
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

  // Helper function to check if path matches discussions pattern
  const isDiscussionsPath = (path: string) => {
    console.log("Checking path: ", path);
    const match = path.match(
      /\/dashboard\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/discussions/
    );
    console.log("Match: ", match);
    return match !== null;
  };

  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isDiscussionsPath(pathname));

  useEffect(() => {
    setIsCollapsed(isDiscussionsPath(pathname));
  }, [pathname]);

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
  ...(classes.length > 0
    ? [
        {
          name: "Discussions",
          href: `/dashboard/${classes[0].id}/discussions`,
          icon: ChatBubbleLeftRightIcon,
          current: pathname === "/dashboard/discussions",
        },
      ]
    : [
        {
          name: "Discussions",
          href: `/dashboard`,
          icon: ChatBubbleLeftRightIcon,
          current: pathname === "/dashboard/discussions",
        },
      ]),
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserIcon,
    current: pathname === "/dashboard/profile",
  },
  ...(classes.length > 0
    ? [
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
      ]
    : [
        {
          name: "Courses",
          href: "#",
          icon: AcademicCapIcon,
          current: pathname.startsWith("/dashboard/classes"),
          children: classes.map((cls) => ({
            name: "",
            href: "",
            current: false,
          })),
        },
      ]),
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
      <DesktopSidebar navigation={navigation} isCollapsed={isCollapsed} />
      <div
        className={`${
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        } transition-all duration-300`}
      >
        <TopNavBar
          setSidebarOpen={setSidebarOpen}
          userNavigation={userNavigation}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <main className="bg-[#FAFAFA] py-10 px-[20px] sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}
