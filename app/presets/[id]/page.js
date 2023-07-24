import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import ClientButton from "@/components/ClientButton";
import { getTemplate, getExercises } from "@/utils/helpers";
import { nanoid } from "nanoid";
import Preset from "@/database/models/Presets";

export default async function SingleTemplateView( { params }) {
  const { id } = params;

  const templateData = getTemplate(id);
  const exercisesData = getExercises();
  const [ template, exercises ] = await Promise.all([templateData, exercisesData])

  const handleAddDay = async () => {
    "use server"
    const day = {
      day: template.routine.length + 1,
      exercises: [],
      id: nanoid(4),
    }

    const updatedRoutine = template.routine;
    updatedRoutine[updatedRoutine.length] = day
    await Preset.findByIdAndUpdate(id, { routine: updatedRoutine})
    console.log(`Added day ${day.day} to ${template.name}`)
  }


  

  return (
    <section className={styles.modify__template__view}>
      <TemplateHeader name={template.name} focus={template.focus} />
      {template.routine.length > 0 && (
        <ClientButton
          textContent="Set Current"
          id={params.id}
          modifier="center"
        />
      )}
      <ul className={styles.session__list}>
        {template.routine.map((session) => (
          <SessionContainer
            key={session.id}
            session={session}
            exercises={exercises}
            mutable={template.mutable}
          />
        ))}
      </ul>
      {template.routine.length < 7 && template.mutable && (
        <ClientButton textContent="Add Day" modifier="center" handler={handleAddDay} />
      )}
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
