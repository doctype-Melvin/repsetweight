import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";

export const addDayToRoutine = async (id, updatedRoutine) => {
  await dbConnect();
  await Preset.findByIdAndUpdate(id, { routine: updatedRoutine });
  console.log("Routine updated!");
};

export const getTemplate = async (id) => {
  const response = await fetch(`http://localhost:3000/api/templates/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Fetching ${id} failed`);
  }
  return response.json();
};

export const getExercises = async () => {
  const response = await fetch(`http://localhost:3000/api/exercises`);
  if (!response.ok) {
    throw new Error(`Fetching exercises failed`);
  }
  return response.json();
};

export const handleAddDay = async () => {
  // "use server";
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
  }
};

