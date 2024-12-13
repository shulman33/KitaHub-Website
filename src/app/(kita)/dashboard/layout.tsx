import React from "react";
import ClientLayout from "./client-layout";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import "@/app/globals.css";

const mont = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={mont.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ClientLayout>{children}</ClientLayout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </UserProvider>
    </html>
  );
}
