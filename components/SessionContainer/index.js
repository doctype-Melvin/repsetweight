"use client";
import "./styles.css";

export default function SessionContainer({ session }) {
  return (
    <li className="day__container">
      <p className="day__ident">Day {session.day}</p>
      {session.exercises.length > 0 && (
        <ul className="day__exercise__list">
          {session.exercises.map((exercise, index) => (
            <li key={index + exercise}>{exercise.toUpperCase()}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
