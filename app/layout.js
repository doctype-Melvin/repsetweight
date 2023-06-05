"use client";
import MainLayout from "@/components/Layout";
import React from "react";


export default function RootLayout({ children } ) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <MainLayout>          
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
