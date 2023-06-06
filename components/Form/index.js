"use client"

import "./style.css"

export default function Form() {

      const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const templateData = Object.fromEntries(formData)

        console.log(templateData)
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <fieldset className="field__set">
                <legend>
                <label htmlFor="templateName" className="label">Template Name</label>
                </legend>
                <input type="text" name="templateName" id="templateName" min={1} max={30} />
            </fieldset>
            <fieldset className="field__set">
                <legend>
                <label htmlFor="days" className="label">Days</label>
                </legend>
                <input type="number" name="days" id="days" min={1} max={7} />
            </fieldset>
            <fieldset className="field__set">
                <legend>
                <label htmlFor="focus" name="focus" className="label">Focus</label>
                </legend>
                <select name="focus">
                    <option value="strength">Strength</option>
                    <option value="hypertrophy">Hypertrophy</option>
                    <option value="mobility">Mobility</option>
                    <option value="conditioning">Conditioning</option>
                    <option value="endurance">Endurance</option>
                    <option value="athleticism">General Athleticism</option>
                    <option value="none">None</option>
                </select>
            </fieldset>
                <button className="submit__button" type="submit">OK</button>
        </form>
    )
}