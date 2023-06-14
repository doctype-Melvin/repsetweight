"use client";

import { styled } from "styled-components";

export default function CustomButton({ textContent, action }) {
 // How to handle button actions through a library
  const buttonActions = {
    log: "I'm logging",
    add: "I'm adding",
    subtract: "I'm subtracting",
  }

  return (
      <ButtonContainer>
      <StyledButton onClick={() => console.log(buttonActions[action])}>{textContent}</StyledButton>
      </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const StyledButton = styled.button`
  border: 1px solid var(--white);
  border-radius: 5px;
  background-color: var(--yellow);
  padding: 0.5rem 1rem;
  `;
