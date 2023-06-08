"use client";

import { styled } from "styled-components";

export default function Home() {
  return (
    <PageContainer>
      
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 1fr);
  justify-items: center;
  row-gap: 1rem;
  padding-top: 1rem;
  padding-bottom: calc(20px + var(--navbar-height));
`;
