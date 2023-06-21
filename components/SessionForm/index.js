"use client";

import { useState } from "react";
import "./styles.css";

export default function SessionForm({ onButtonClick }) {
  
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <section className="session__form__container">
        <form>
          <select
            name="type"
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            <option value="lifting">Lifting</option>
            <option value="conditioning">Conditioning</option>
            <option value="endurance">Endurance</option>
            <option value="strength-endurance">Strength Endurance</option>
          </select>
          <label htmlFor="exercise">
            Exercise
          </label>
            <input type="text" id="exercise" name="exercise" />
          {selectedOption === "endurance" ? (
            <>
            <label htmlFor="duration">
              Duration
            </label>
              <input type="number" id="duration" name="duration" />
            </>
          ) : (
            <>
              <label htmlFor="sets">
                Sets
              </label>
                <input type="number" id="sets" name="sets" />
              <label htmlFor="reps">
                Reps
              </label>
                <input type="number" id="reps" name="reps" />
            </>
          )}
          <button type="button" onClick={onButtonClick}>
            OK
          </button>
        </form>
    </section>
  );
}
