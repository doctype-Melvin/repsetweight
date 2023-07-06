import Link from "next/link";
import Template from "@/database/models/Templates";
import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import Exercise from "@/database/models/Exercises";

export default async function NewTemplate({ params }) {
  const { id } = params;

  const template = await Template.findById(id);
  const exercises = await JSON.parse(JSON.stringify(await Exercise.find()));

  if (!template || !exercises) return <div> Loading ...</div>;
  return (
    <section className={styles.modify__template__view}>
      <Link className="back-link" href="/template">
        {" "}
        &lt; Back{" "}
      </Link>
      <TemplateHeader name={template.name} focus={template.focus} />
      <ul className={styles.session__list}>
        {template.routine.map((session) => (
          <SessionContainer key={session.id} session={session} />
        ))}
      </ul>
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
