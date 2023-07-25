"use client"

import "./styles.css"
import ClientButton from "../ClientButton"
import { useState } from "react"

export default function FormExerciseDetails({exercises, handler}){
    const [ searchValue, setSearchValue ] = useState("")
    const [ name, setName ] = useState("")

    const onAdd = (searchTerm) => {
        setSearchValue(searchTerm);
        setName(searchTerm);
    }

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        setName("")
    }

    return (
        <section>
        <form autoComplete="off">
                <label htmlFor="exercise">
                    Exercise
                </label>
                    <input type="text" name="exercise" value={searchValue} onChange={handleChange}
                    />
                    
                <label htmlFor="sets">
                    Sets
                </label>
                    <input type="number" name="sets" />
                <label htmlFor="reps">
                    Reps
                </label>
                    <input type="number" name="reps" />
                <label htmlFor="weight">
                    Weight
                </label>
                    <input type="number" name="weight" />
                <div className="button__form">
                <ClientButton type="button" modifier="center add" textContent="Add" handler={handler} />
                <ClientButton type="button" modifier="center close" textContent="Close" handler={handler} />
                </div>
            </form>
            {name === "" && <div className="container__suggestions">
                        {exercises.filter((exercise) => {
                            const searchTerm = searchValue.toLowerCase();
                            const exerciseName = exercise.name.toLowerCase();
                            return (
                                searchTerm &&
                                exerciseName.includes(searchTerm) &&
                                exerciseName !== searchTerm
                            )
                        }).slice(0, 5)
                        .map((exercise) => (
                            <div className="search__results"
                            key={exercise.id}
                            onClick={() => onAdd(exercise.name)}
                            exercise={exercise}
                            >
                            {exercise.name}
                            </div>
                        ))
                        }
            </div>}
        </section>
    )
}