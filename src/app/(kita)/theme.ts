"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(13, 108, 255, 1)",
    },
    secondary: {
      main: "rgba(214, 32, 255, 1)",
      light: "rgba(224, 120, 255, 1)",
    },
    success: {
      main: "#04E762",
    },
    error: {
      main: "#FF3A20",
    },
  },
  typography: {
    fontFamily: "var(--font-montserrat)",
  },
});

export default theme;
