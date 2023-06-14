"use client"

import MainLayout from "@/components/Layout";
import React from "react";
import StyledComponentsRegistry from "./registry";
import { GlobalStyle } from "./style.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <MainLayout>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
