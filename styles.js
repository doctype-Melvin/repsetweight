'use client'

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: system-ui;
  }

`