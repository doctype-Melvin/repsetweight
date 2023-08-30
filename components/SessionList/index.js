"use client";

import "./styles.css";
import ClientButton from "../ClientButton";
import SessionContainer from "../SessionContainer";
import { useState } from "react";
import useSWR from "swr";

export default function SessionList({ id, template, addNewExercise }) {
  const { data, isLoading, mutate } = useSWR(id ? `/api/templates/${id}` : null);

  const addExercise = async (formData, dayId) => {
    const currentDay = data.routine.find(session => session.id === dayId);
    const currentIndex = data.routine.findIndex(session => session.id === dayId)
    const updatedExercises = currentDay.exercises
    updatedExercises[updatedExercises.length] = formData
    currentDay.exercises = updatedExercises
    data.routine[currentIndex] = currentDay
    await addNewExercise(id, data)
    mutate({...data, data}, false)
  }

  if (!template && !data && isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {!data
        ? template.routine.map((session) => (
            <SessionContainer
              key={session.id}
              session={session}
              mutable={template.mutable}
            />
          ))
        : data.routine.map((session) => (
            <SessionContainer
              key={session.id}
              session={session}
              mutable={data.mutable}
              addExercise={addExercise}
            />
          ))}
      {!template && (
        <ClientButton
          textContent="Add Day"
          modifier="center"
          handler={() => console.log("Add day here")}
        />
      )}
    </ul>
  );
}
