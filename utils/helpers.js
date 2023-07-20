import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";
import Exercise from "@/database/models/Exercises";

export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

export const addDayToRoutine = async (id, updatedRoutine) => {
  await dbConnect();
  await Preset.findByIdAndUpdate(id, { routine: updatedRoutine });
  console.log("Routine updated!");
};

export const getExercises = async () => {
  await dbConnect();
  const exercises = await JSON.parse(JSON.stringify(await Exercise.find()));
  return exercises;
};
