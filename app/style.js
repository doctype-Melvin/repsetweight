"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root {
  --navbar-height: 3rem;
  --dark-background: #2e2d30;
  --light-purple: #db0c9b;
  --dark-purple: #8f1568;
  --yellow: #dbbf21;
  --turquoise: #21d6db;
  --dark-turquoise: #008b8f;
  --white: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
  background-color: var(--dark-background);
  color: var(--white);
}

`;
