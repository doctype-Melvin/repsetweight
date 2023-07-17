"use client";

import "./styles.css";
import ClientButton from "../ClientButton";
import ExerciseForm from "../ExerciseForm";
import { useState } from "react";

export default function SessionContainer({ session, exercises }) {
  const [toggleForm, setToggleForm] = useState(false);

  // const handleToggleForm = () => setToggleForm(!toggleForm)
  const handleToggleForm = () => setToggleForm(!toggleForm);

  return (
    <>
      <li className="day__container">
        <p className="day__ident">Day {session.day}</p>
        {session.exercises.length > 0 && (
          <ul className="day__exercise__list">
            {session.exercises.map((exercise, index) => (
              <li className="day__exercise__item" key={index + exercise}>
                <div>{exercise.name.toUpperCase()}</div>
                <div>{exercise.mode}</div>
                <div className="container__buttons">
                  <button type="button" className="button edit">
                    Edit
                  </button>
                  <button type="button" className="button delete">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </li>
      {!toggleForm && (
        <ClientButton textContent="Add Exercise" handler={handleToggleForm} />
      )}
      {toggleForm && (
        <ExerciseForm exercises={exercises} handler={handleToggleForm} />
      )}
    </>
  );
}
