import React from "react";
import ClientLayout from "./client-layout"; 
import { Montserrat } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/app/globals.css";

const mont = Montserrat({ subsets: ["latin"] });


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={mont.className}>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </UserProvider>
    </html>
  );
 
}

