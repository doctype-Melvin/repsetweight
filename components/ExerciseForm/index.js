"use client";

import { useState } from "react";
import styled from "styled-components";
import "./styles.css"

export default function ExerciseForm({ exercises }) {
  const [searchValue, setSearchValue] = useState("");

  const onAdd = (searchTerm) => {
    setSearchValue(searchTerm);
    console.log("looking for: ", searchTerm);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <section>
      <div className="exercise__search__form">
        <input
          className="exercise__search__box"
          type="text"
          name="exercise"
          id="exercise"
          value={searchValue}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="button" onClick={() => onAdd(searchValue)}>
          Add
        </button>
      </div>
      <div>
        {exercises
          .filter((exercise) => {
            const searchTerm = searchValue.toLowerCase();
            const exerciseName = exercise.name.toLowerCase();

            return (
              searchTerm &&
              exerciseName.includes(searchTerm) &&
              exerciseName !== searchTerm
            );
          })
          .slice(0, 7)
          .map((exercise) => (
            <div
              className="search__results"
              key={exercise._id}
              onClick={() => onAdd(exercise.name)}
              exercise={exercise}
            >
              {exercise.name}
            </div>
          ))}
      </div>
    </section>
  );
}

const TempContainer = styled.div`
  display: flex;
`;
