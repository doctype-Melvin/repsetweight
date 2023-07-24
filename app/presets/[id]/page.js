import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import ClientButton from "@/components/ClientButton";
import { getTemplate, getExercises } from "@/utils/helpers";

export default async function SingleTemplateView( { params }) {
  const { id } = params;
  const templateData = getTemplate(id);
  const exercisesData = getExercises();

  const [ template, exercises ] = await Promise.all([templateData, exercisesData])

  if (!template) return <div> Loading ...</div>;

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
        <ClientButton textContent="Add Day" modifier="center" />
      )}
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
