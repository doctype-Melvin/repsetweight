"use client";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles";
import MainLayout from "@/components/Layout";

export default function RootLayout({ children, headerText }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
        <ThemeProvider theme={{}}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
        </MainLayout>
      </body>
    </html>
  );
}
