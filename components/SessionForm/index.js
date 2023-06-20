"use client"

import { useState } from "react"
import ExerciseForm from "../ExerciseForm"
import "./styles.css"

export default function SessionForm({exercises}) {
    const [showForm, setShowForm ] = useState(false)

    return (
        <section className="session__form__container">
            {!showForm && <button type="button" className="add__day__button" onClick={ () => setShowForm(true)}>New Session</button>}
            {showForm && <ExerciseForm exercises={exercises}/>}
        </section>
    )
}