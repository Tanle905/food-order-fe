"use client";
import { Box, ThemeProvider } from "@mui/material";
import "./globals.css";
import { OGHeader } from "@/components/organisms/headers/header.organism";
import { SWRConfig } from "swr";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "@/utils/cache";
import { darkTheme } from "@/constants/theme";
import { CacheProvider } from "@emotion/react";

const cache = createEmotionCache();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <CacheProvider value={cache}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Box pb={5} className="min-h-screen">
                <OGHeader />
                {children}
              </Box>
            </ThemeProvider>
          </CacheProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
