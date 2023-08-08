import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiTypography: {
        variants: [
          {
            props: {
              variant: "h1",
            },
            style: {
              color: "white",
            },
          },
          {
            props: {
              variant: "subtitle1",
            },
            style: {
              color: "white",
            },
          },
          {
            props: {
              variant: "subtitle2",
            },
            style: {
              color: "white",
            },
          },
          {
            props: {
              variant: "body1",
            },
            style: {
              color: "white",
            },
          },
        ],
      },
    },
  });