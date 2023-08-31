import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import ClientButton from "@/components/ClientButton";
import SessionList from "@/components/SessionList";
import Preset from "@/database/models/Presets";
import SWRProvider from "@/app/SWRProvider";
import { getTemplate, getExercises } from "@/utils/helpers";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";

export default async function TemplateDetail({ params }) {
  const { id } = params;

  const template = await getTemplate(id);

  // This is a server function to update the routine array of 
  // any given template
  const addNewExercise = async (id, data) => {
    "use server"
    await fetch(`http://localhost:3000/api/templates/${id}`)
      .then(response => {
        if (!response.ok) {
          console.log('Failed fetch')
        }
        return response.json();
      })
      .then(fetchData => console.log(`template: ${fetchData.name}, new data: ${data.focus}`))
  }

  const handleAddDay = async () => {
    "use server";
    const updatedTemplate = await getTemplate(id);

    if (updatedTemplate.routine.length < 7) {
      const day = {
        day: updatedTemplate.routine.length + 1,
        exercises: [],
        id: nanoid(4),
      };

      const updatedRoutine = updatedTemplate.routine;
      updatedRoutine[updatedRoutine.length] = day;
      await Preset.findByIdAndUpdate(id, { routine: updatedRoutine });

      console.log(`Added day ${day.day} to ${updatedTemplate.name}`);

    } else {
      console.log(`There are already 7 workout days`)
      return `Maximum number of workouts exceeded`
    }
  };

  // This component will evaluate if the template is mutable or not
  // If it is immutable, the data is static and can be rendered as is
  // Otherwise, data can be mutated by the user
  // In this case render client components and use SWR to handle dynamic
  //    data mutations and data updates

  return (
    <SWRProvider>
      <section className={styles.modify__template__view}>
        <TemplateHeader name={template.name} focus={template.focus} />
        {
          !template.isCurrent && (
            <ClientButton
              textContent="Set Current"
              id={params.id}
              modifier="center"
            />
          )
        };
        {/* 
          List of session containers
          Each session container is a workout day
          Workout days may be removed from list/db
          Rewrite the current session container component
          SessionContainer is a client component
          CRUD exercise data 
        */}
        {
          template.mutable && template.routine.length < 7 && (
            <ClientButton
              textContent="Add Day"
              modifier="center"
              handler={handleAddDay}
            />
          )
        }

      </section>
    </SWRProvider>
  );
}
