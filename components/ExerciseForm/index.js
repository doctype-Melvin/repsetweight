"use client";

import "./styles.css";
import { useState } from "react";
import ClientButton from "../ClientButton";
import { AiOutlineSearch as Search } from "react-icons/ai";

export default function ExerciseForm({ exercises, handler }) {
  const [searchValue, setSearchValue] = useState("");

  const onAdd = (searchTerm) => {
    setSearchValue(searchTerm);
    console.log("looking for: ", searchTerm);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <section className="container__exercise-form">
      <form className="exercise__search__form">
        <input
          className="exercise__search__box"
          type="text"
          name="exercise"
          id="exercise"
          value={searchValue}
          onChange={handleChange}
          autoComplete="off"
        />
        {searchValue === "" && <Search className="icon__search" />}
        <div className="container__exercise-form__buttons">
          <ClientButton
            textContent="Add"
            type="button"
            modifier="add"
            handler={() => onAdd(searchValue)}
          />
          <ClientButton
            textContent="Close"
            type="button"
            modifier="close"
            handler={handler}
          />
        </div>
      </form>
      <div className="container__search__results">
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
