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
