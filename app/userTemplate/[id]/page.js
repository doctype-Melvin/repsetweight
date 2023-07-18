import Preset from "@/database/models/Presets";
import ClientButton from "@/components/ClientButton";
import styles from "./styles.module.css"

export default async function CreateTemplateForm({params}){
    const { id } = params;
    const newTemplate = await Preset.findById(id);

    const submitHandler = async () => {
        "use server"
        console.log('Submit')
    }

    return (
        <section>
            <form className={styles.form__styled}>
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
                <ClientButton type="submit" textContent="Add" modifier="center" handler={submitHandler} />
        </section>
    )
}