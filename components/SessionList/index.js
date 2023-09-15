"use client";

import "./styles.css";
import ClientButton from "../ClientButton";
import SessionContainer from "../SessionContainer";
import { useState } from "react";
import useSWR from "swr";
import { nanoid } from "nanoid";


export default function SessionList({ id, template, addNewExercise, addNewDay }) {
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

  const addDay = async (id) => {
    const updatedRoutine = data.routine
    if (updatedRoutine.length < 7) {
      
      const day = {
        day: updatedRoutine.length + 1,
        exercises: [],
        id: nanoid(4),
      };

      updatedRoutine[updatedRoutine.length] = day;
      data.routine = updatedRoutine;
      console.log(data.routine)
      await addNewDay(id, updatedRoutine)
      mutate({...data, data}, false)
    }
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
      {data && (
        <ClientButton
          textContent="Add Day"
          modifier="center"
          handler={() => addDay(id)}
        />
      )}
    </ul>
  );
}
