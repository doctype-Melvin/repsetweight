"use client"

import { styled } from "styled-components";

export default function Form() {

      const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const templateData = Object.fromEntries(formData)

        console.log(templateData)
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledFieldset >
                <legend>
                <StyledLabel htmlFor="templateName" >Template Name</StyledLabel>
                </legend>
                <StyledInput type="text" name="templateName" id="templateName" min={1} max={30} />
            </StyledFieldset>
            <StyledFieldset >
                <legend>
                <StyledLabel htmlFor="days" >Days</StyledLabel>
                </legend>
                <StyledInput type="number" name="days" id="days" min={1} max={7} />
            </StyledFieldset>
            <StyledFieldset >
                <legend>
                <StyledLabel htmlFor="focus" name="focus" >Focus</StyledLabel>
                </legend>
                <StyledSelect name="focus">
                    <option value="strength">Strength</option>
                    <option value="hypertrophy">Hypertrophy</option>
                    <option value="mobility">Mobility</option>
                    <option value="conditioning">Conditioning</option>
                    <option value="endurance">Endurance</option>
                    <option value="athleticism">General Athleticism</option>
                    <option value="none">None</option>
                </StyledSelect>
            </StyledFieldset>
                <StyledSubmitButton type="submit">OK</StyledSubmitButton>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    background-color: var(--dark-purple);
    padding: 1rem;
    border-radius: 3px;
    display: grid;
    gap: 1rem;
    width: 100%;
`

const StyledFieldset = styled.fieldset`
border: 1px solid var(--white);
    border-radius: 5px;
`

const StyledLabel = styled.label`
    color: var(--white)
`

const StyledInput = styled.input`
     border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    padding: .25rem 0 .25rem .5rem;
`

const StyledSelect = styled.select`
    width: 100%;
    padding: .5rem;
    background-color: var(--white);
    border: none;
    border-radius: 5px;
`

const StyledSubmitButton = styled.button`
    width: 25%;
    margin: 0 auto;
    border: none;
    border-radius: 5px;
    background-color: var(--yellow);
    padding: .5rem 1rem;
`