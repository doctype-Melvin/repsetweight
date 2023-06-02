'use client'

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={{}}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
        </body>
    </html>
  )
}
