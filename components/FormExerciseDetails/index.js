"use client"

import "./styles.css"
import ClientButton from "../ClientButton"
import { useState } from "react"


export default function FormExerciseDetails({exercises, toggleForm}){
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

    const handleFocus = () => setUserChoice(true)

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        console.log(data)
        toggleForm()
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
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="exercise">
                    Exercise
                </label>
                    <input type="text" name="exercise" value={searchValue} onChange={handleChange}
                
                    />
                    
                <label htmlFor="sets">
                    Sets
                </label>
                    <input type="number" name="sets" onFocus={handleFocus} />
                <label htmlFor="reps">
                    Reps
                </label>
                    <input type="number" name="reps" onFocus={handleFocus} />
                <label htmlFor="weight">
                    Weight
                </label>
                    <input type="number" name="weight" onFocus={handleFocus} />
                <div className="button__form">
                <ClientButton type="submit" modifier="center add" textContent="Add" />
                <ClientButton type="button" modifier="center close" textContent="Close" handler={toggleForm} />
                </div>
            </form>
            {!userChoice && searchSuggestions.length > 0 && <ul className="container__suggestions">
                        {searchSuggestions.map((exercise) => (
                            <li 
                            key={exercise._id}
                            className="search__results"
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