"use client";

import { styled } from "styled-components";
import Form from "@/components/Form";
import ExerciseForm from "@/components/ExerciseForm";
import { useState, useEffect } from "react";

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
      {/* <Form /> */}
      <ExerciseForm exercises={exercises} />
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
