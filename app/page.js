"use client";

import LinkCard from "@/components/LinkCard";
import { styled } from "styled-components";
import { preset } from "swr/_internal";

const LinkSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  height: calc(100vh - var(--header-height));
  padding: 1rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export default function Home() {
  return (
    <LinkSection>
      <LinkCard linkTitle="Create Workout Template" target="/presets/new" />
      <LinkCard linkTitle="Log Workout" target="/logWorkout" />
      <LinkCard linkTitle="Browse Preset Templates" target="/presets" />
      <LinkCard linkTitle="Workout History & Charts" target="/logHistory" />
    </LinkSection>
  );
}
