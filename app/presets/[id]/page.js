"use client";

import Preset from "@/database/models/Presets";
import TemplateHeader from "@/components/TemplateHeader";
import SessionContainer from "@/components/SessionContainer";
import styles from "./styles.module.css";
import Exercise from "@/database/models/Exercises";
import ClientButton from "@/components/ClientButton";
import dbConnect from "@/database/connectDB";
import { nanoid } from "nanoid";
import useSWR from "swr";
import { getExercises } from "@/utils/helpers";
import { fetcher } from "@/utils/helpers";

// const tempHandler = async () => {
//   "use server";
//   await dbConnect();
//   const { id } = params;
//   await Preset.updateMany({ isCurrent: false });
//   await Preset.findByIdAndUpdate(id, { isCurrent: true });
//   console.log("Template set as current");
// };

// const addDayHandler = async () => {
//   "use server";
//   const day = {
//     day: preset.routine.length + 1,
//     exercises: [],
//     id: nanoid(4),
//   };
//   await dbConnect();
//   const updateRoutine = preset.routine;
//   updateRoutine[updateRoutine.length] = day;
//   await Preset.findByIdAndUpdate(id, { routine: updateRoutine });
//   console.log("Added empty day to routine");
// };

export default async function SingleTemplateView({ params }) {
  const { id } = params;
  const { data, isLoading, mutate } = useSWR(`/api/templates/${id}`, fetcher);
  const exercises = await getExercises();
  if (!data || isLoading) return <div> Loading ...</div>;

  return (
    <section className={styles.modify__template__view}>
      <TemplateHeader name={data.name} focus={data.focus} />
      {data.routine.length > 0 && (
        <ClientButton
          textContent="Set Current"
          id={params.id}
          modifier="center"
        />
      )}
      <ul className={styles.session__list}>
        {data.routine.map((session) => (
          <SessionContainer
            key={session.id}
            session={session}
            exercises={exercises}
            mutable={data.mutable}
          />
        ))}
      </ul>
      {data.routine.length < 7 && data.mutable && (
        <ClientButton textContent="Add Day" modifier="center" />
      )}
      {/* Fetch the routine array */}
      {/* Render the first day of a new template */}
      {/* The day component allows for CRUDing exercises  */}
    </section>
  );
}
