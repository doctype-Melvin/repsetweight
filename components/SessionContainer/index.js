"use client";

import "./styles.css";
import ClientButton from "../ClientButton";
import FormExerciseDetails from "../FormExerciseDetails";
import { useState } from "react";
import useSWR from "swr";

export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

export default function SessionContainer({
  session,
  mutable,
  presetId,
}) {
  const [toggleForm, setToggleForm] = useState(false);
  const handleToggleForm = () => setToggleForm(!toggleForm);
  // const { data } = useSWR(`/api/templates/${presetId}`, fetcher);

  // if (!data || isLoading) return <div>Loading data ...</div>

  return (
    <>
      <li className="day__container">
        <p className="day__ident">Day {session.day}</p>
        {session.exercises.length > 0 && (
          <ul className="day__exercise__list">
            {session.exercises.map((exercise, index) => (
              <li
                className={`day__exercise__item ${
                  mutable ? "three__columns" : "two__columns"
                }`}
                key={index + exercise.name}
              >
                <div>{exercise.name.toUpperCase()}</div>
                <div>{exercise.mode}</div>
                {mutable && (
                  <div className="container__buttons">
                    <button type="button" className="button edit">
                      Edit
                    </button>
                    <button type="button" className="button delete">
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>

      {mutable && !toggleForm && (
        <ClientButton
          textContent="Add Exercise"
          modifier="center"
          handler={handleToggleForm}
        />
      )}
      {toggleForm && (
        <FormExerciseDetails
          exercises={exercises}
          toggleForm={handleToggleForm}
        />
      )}
    </>
  );
}
