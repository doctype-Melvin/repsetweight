"use client";
import MainLayout from "@/components/Layout";
import React from "react";
import StyledComponentsRegistry from "./registry";
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <MainLayout>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
