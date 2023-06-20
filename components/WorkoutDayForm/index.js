"use client"

import { useState } from "react"
import "./styles.css"

export default function WorkoutDayForm() {
    const [showForm, setShowForm ] = useState(false)

    return (
        <section className="day__form__container">
            {!showForm && <button type="button" className="add__day__button" onClick={ () => setShowForm(true)}>Add Day</button>}
            {showForm && <button type="button" onClick={() => setShowForm(false)}>Toggle</button>}
        </section>
    )
}