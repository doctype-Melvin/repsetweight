"use client"

import "./styles.css"
import ClientButton from "../ClientButton"

export default function FormExerciseDetails({exercises, handler}){
    return (
        <form>
                <label htmlFor="exercise">
                    Exercise
                </label>
                    <input type="text" name="exercise" />
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
                <ClientButton type="submit" modifier="center add" textContent="Add" handler={handler} />
                <ClientButton type="submit" modifier="center close" textContent="Close" handler={handler} />
                </div>
            </form>
    )
}