// app/(kita)/dashboard/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import ClientLayout from "./client-layout";
import { getSession } from "@auth0/nextjs-auth0";
import { getClassesForCurrentUser } from "../server/actions/classActions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const { sub } = session!.user;
  const classes = await getClassesForCurrentUser(sub);
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ClientLayout classes={classes}>{children}</ClientLayout>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
