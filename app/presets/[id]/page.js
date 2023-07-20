"use client";

import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import ClientButton from "@/components/ClientButton";
import { nanoid } from "nanoid";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";

export default function SingleTemplateView({ params }) {
  const { id } = params;
  const {
    data: template,
    isLoading,
    mutate,
  } = useSWR(`/api/templates/${id}`, fetcher);
  const { data: exercises, error } = useSWR("/api/exercises");

  if (!template || isLoading) return <div> Loading ...</div>;

  return (
    <section className={styles.modify__template__view}>
      <TemplateHeader name={template.name} focus={template.focus} />
      {template.routine.length > 0 && (
        <ClientButton
          textContent="Set Current"
          id={params.id}
          modifier="center"
        />
      )}
      <ul className={styles.session__list}>
        {template.routine.map((session) => (
          <SessionContainer
            key={session.id}
            session={session}
            exercises={exercises}
            mutable={template.mutable}
          />
        ))}
      </ul>
      {template.routine.length < 7 && template.mutable && (
        <ClientButton textContent="Add Day" modifier="center" />
      )}
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
