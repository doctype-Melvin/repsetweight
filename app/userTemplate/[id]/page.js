"use client";

import ClientButton from "@/components/ClientButton";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";
import TemplateHeader from "@/components/TemplateHeader";
import { nanoid } from "nanoid";
import FormExerciseDetails from "@/components/FormExerciseDetails";

export default function CreateTemplateForm({ params }) {
  const { id } = params;
  const { data, isLoading, mutate } = useSWR(`/api/templates/${id}`, fetcher);
  console.log(id);

  const addNewDay = async () => {
    const day = {
      day: data.routine.length + 1,
      exercises: [],
      id: nanoid(4),
    };
    const updatedRoutine = [...data.routine, day];
    mutate({ ...data, routine: updatedRoutine });
    console.log("Add new day button");
  };

  if (!data || isLoading) return <div>Loading ... </div>;

  return (
    <section>
      <TemplateHeader name={data.name} focus={data.focus} />
      <ClientButton
        type="submit"
        textContent="Add Day"
        modifier="center"
        handler={addNewDay}
      />
    </section>
  );
}
