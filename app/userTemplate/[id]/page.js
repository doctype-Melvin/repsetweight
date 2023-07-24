import ClientButton from "@/components/ClientButton";
import TemplateHeader from "@/components/TemplateHeader";
import FormExerciseDetails from "@/components/FormExerciseDetails";
import { getTemplate } from "@/utils/helpers";

export default async function CreateTemplateForm({ params }) {
  const { id } = params;
  const newTemplate = await getTemplate(id);

  // const addNewDay = async () => {
  //   const day = {
  //     day: data.routine.length + 1,
  //     exercises: [],
  //     id: nanoid(4),
  //   };
  //   const updatedRoutine = [...data.routine, day];
  //   mutate({ ...data, routine: updatedRoutine });
  //   console.log("Add new day button");
  // };

  return (
    <section>
      <TemplateHeader name={newTemplate.name} focus={newTemplate.focus} />
      <ClientButton type="submit" textContent="Add Day" modifier="center" />
    </section>
  );
}
