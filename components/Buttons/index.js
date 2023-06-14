"use client";

import { styled } from "styled-components";

export default function CustomButton({ textContent, action }) {

  const buttonActions = {
    log: "I'm logging",
    add: "I'm adding",
    subtract: "I'm subtracting",
  }

  return <StyledButton onClick={() => console.log(buttonActions[action])}>{textContent}</StyledButton>;
}

export const StyledButton = styled.button`
  width: 25%;
  margin: 0 auto;
  border: 1px solid var(--white);
  border-radius: 5px;
  background-color: var(--yellow);
  padding: 0.5rem 1rem;
`;
