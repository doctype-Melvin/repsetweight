"use client"

import "./styles.css"
import ClientButton from "../ClientButton"
import { useState } from "react"


export default function FormExerciseDetails({exercises, handler}){
    const [ searchValue, setSearchValue ] = useState("")
    const [ userChoice, setUserChoice ] = useState(false)

    const onAdd = (searchTerm) => {
        setSearchValue(searchTerm);
        setUserChoice(true);
    }

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        setUserChoice(false);
    }

    const handleBlur = () => {
        const searchTerm = searchValue.toLowerCase();
        const exactMatch = exercises.find((exercise) => exercise.name.toLowerCase() === searchTerm); 
        if (exactMatch) {
            setUserChoice(true);
        }
    }

    const searchSuggestions = exercises.filter(exercise => {
        const searchTerm = searchValue.toLowerCase();
        const exerciseName = exercise.name.toLowerCase();
        return (
                searchTerm &&
                exerciseName.includes(searchTerm) &&
                exerciseName !== searchTerm
        )}).slice(0, 5)

    return (
        <section>
        <form autoComplete="off">
                <label htmlFor="exercise">
                    Exercise
                </label>
                    <input type="text" name="exercise" value={searchValue} onChange={handleChange}
                    // onBlur={() => setUserChoice(true)}
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
            {!userChoice && searchSuggestions.length > 0 && <ul className="container__suggestions">
                        {searchSuggestions.map((exercise) => (
                            <li 
                            className="search__results"
                            key={exercise.id}
                            onClick={() => onAdd(exercise.name)}
                            exercise={exercise}
                            >
                            {exercise.name}
                            </li>
                        ))}
            </ul>}
        </section>
    )
}