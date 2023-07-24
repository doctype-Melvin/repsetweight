import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";

export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

export const addDayToRoutine = async (id, updatedRoutine) => {
  await dbConnect();
  await Preset.findByIdAndUpdate(id, { routine: updatedRoutine });
  console.log("Routine updated!");
};

export const getTemplate = async (id) => {
  const response = await fetch(`http://localhost:3000/api/templates/${id}`, { cache: 'no-store'})
  if (!response.ok) {
    throw new Error(`Fetching ${id} failed`)
  }
  return response.json()
}

export const getExercises = async () => {
  const response = await fetch(`http://localhost:3000/api/exercises`)
  if (!response.ok) {
    throw new Error(`Fetching exercises failed`)
   }
   return response.json()
}



// export const getExercises = async () => {
//   await dbConnect();
//   const exercises = await JSON.parse(JSON.stringify(await Exercise.find()));
//   return exercises;
// };

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
