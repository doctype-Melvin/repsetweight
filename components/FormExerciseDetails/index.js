import "./styles.css"

export default function FormExerciseDetails(){
    return (
        <form>
                <label htmlFor="exercise"> Exercise
                    <input type="text" name="exercise" />
                </label>
                <label htmlFor="sets"> Sets
                    <input type="number" name="sets" />
                </label>
                <label htmlFor="reps"> Reps
                    <input type="number" name="reps" />
                </label>
                <label htmlFor="weight"> Weight
                    <input type="number" name="weight" />
                </label>
            </form>
    )
}