"use client";

import { useState } from "react";
import "./styles.css";
import SessionForm from "../SessionForm";

export default function SessionContainer({ session }) {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => setShowForm(!showForm);

  return (
    <li className="day__container">
      <p className="day__ident">Day {session.day}</p>
      {session.exercises.length > 0 && <p>List of exercises</p>}
      {!showForm && (
        <button type="button" onClick={handleToggleForm}>
          +
        </button>
      )}
      {showForm && <SessionForm onButtonClick={handleToggleForm} />}
    </li>
  );
}
