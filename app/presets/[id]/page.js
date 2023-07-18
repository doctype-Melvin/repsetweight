import Preset from "@/database/models/Presets";
import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import Exercise from "@/database/models/Exercises";
import ClientButton from "@/components/ClientButton";
import dbConnect from "@/database/connectDB";
import { nanoid } from "nanoid";

export default async function SingleTemplateView({ params }) {
  const { id } = params;
  const preset = await Preset.findById(id);
  const exercises = await JSON.parse(JSON.stringify(await Exercise.find()));

  const tempHandler = async () => {
    "use server";
    await dbConnect();
    const { id } = params;
    await Preset.updateMany({ isCurrent: false });
    await Preset.findByIdAndUpdate(id, { isCurrent: true });
    console.log("Template set as current");
  };

  const addDayHandler = async () => {
    "use server"
    const day = {
      day: preset.routine.length + 1,
      exercises: [],
      id: nanoid(4),
    }
    await dbConnect()
    const updateRoutine = preset.routine;
    updateRoutine[updateRoutine.length] = day;
    await Preset.findByIdAndUpdate(id, {routine: updateRoutine});
    console.log('Added empty day to routine')
  }

  if (!preset || !exercises) return <div> Loading ...</div>;

  return (
    <section className={styles.modify__template__view}>
      <TemplateHeader name={preset.name} focus={preset.focus} />
      {
        preset.routine.length > 0 && <ClientButton
        textContent="Set Current"
        id={params.id}
        modifier="center"
        handler={tempHandler}
      />
      }
      <ul className={styles.session__list}>
        {preset.routine.map((session) => (
          <SessionContainer
            key={session.id}
            session={session}
            exercises={exercises}
            mutable={preset.mutable}
          />
        ))}
      </ul>
      {
        preset.routine.length < 7 &&
        <ClientButton
        textContent="Add Day"
        modifier="center"
        handler={addDayHandler}
        />
      }
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
