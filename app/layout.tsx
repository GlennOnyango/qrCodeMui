import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

import type { Metadata } from "next";
import { LocalizationContextProvider } from "./components/context/LocalizationContext";
import { QrContextProvider } from "./context/QrContext";

export const metadata: Metadata = {
  title: "PAKPRO Certification",
  description: "PAKPRO QR generation and verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ marginTop: 0 }}>
        {" "}
          <ThemeRegistry>
            <LocalizationContextProvider>
              <QrContextProvider>
                <Box>{children}</Box>
              </QrContextProvider>
            </LocalizationContextProvider>
          </ThemeRegistry>
      </body>
    </html>
  );
}
