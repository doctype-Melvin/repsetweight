"use client";

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [exercises, setExercises] = useState("");

  // Fetch exercises data from DB
  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);

  if (!exercises) return <div>Loading...</div>;

  return (
    <PageContainer>
      <StyledLink href="/createTemplate"> Create New Template </StyledLink>
      <StyledLink href="/allTemplates"> View All Templates </StyledLink>
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

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:visited {
    color: var(--turquoise);
  }
`;
