import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#020617",
      paper: "#0f172a",
    },
  },
});
