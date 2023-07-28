import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import ClientButton from "@/components/ClientButton";
import SessionList from "@/components/SessionList";
import Preset from "@/database/models/Presets";
import { getTemplate, getExercises } from "@/utils/helpers";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";

export default async function TemplateDetail({ params }) {
  const { id } = params;

  const templateData = getTemplate(id);
  const exercisesData = getExercises();
  const [template, exercises] = await Promise.all([
    templateData,
    exercisesData,
  ]);
  // This component will evaluate if the template is mutable or not
  // If it is immutable, the data is static and can be rendered as is
  // Otherwise, data can be mutated by the user
  // In this case render client components and use SWR to handle dynamic
  //    data mutations and data updates
  const handleAddDay = async () => {
    "use server";
    const day = {
      day: template.routine.length + 1,
      exercises: [],
      id: nanoid(4),
    };

    const updatedRoutine = template.routine;
    updatedRoutine[updatedRoutine.length] = day;
    await Preset.findByIdAndUpdate(id, { routine: updatedRoutine });
    console.log(`Added day ${day.day} to ${template.name}`);
    // App needs to rerender immediately
  };

  return (
    <section className={styles.modify__template__view}>
      <TemplateHeader name={template.name} focus={template.focus} />
      {!template.isCurrent && (
        <ClientButton
          textContent="Set Current"
          id={params.id}
          modifier="center"
        />
      )}
      {template.mutable ? (
        <SessionList id={template._id} template={false} />
      ) : (
        <SessionList id={false} template={template} />
      )}
    </section>
  );
}
