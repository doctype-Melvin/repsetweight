import Link from "next/link";
import Preset from "@/database/models/Presets";
import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import Exercise from "@/database/models/Exercises";
import ClientButton from "@/components/ClientButton";

export default async function NewTemplate({ params }) {
  const { id } = params;

  const preset = await Preset.findById(id);
  const exercises = await JSON.parse(JSON.stringify(await Exercise.find()));

  if (!preset || !exercises) return <div> Loading ...</div>;

  return (
    <section className={styles.modify__template__view}>
      <Link className="back-link" href="/presets">
        {" "}
        &lt; Back{" "}
      </Link>
      <TemplateHeader name={preset.name} focus={preset.focus} />
      <ClientButton textContent="Set Current" />
      <ul className={styles.session__list}>
        {preset.routine.map((session) => (
          <SessionContainer key={session.id} session={session} />
        ))}
      </ul>
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
