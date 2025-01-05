// app/(kita)/dashboard/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import ClientLayout from "./client-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ClientLayout>{children}</ClientLayout>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
