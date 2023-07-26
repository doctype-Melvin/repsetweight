import dbConnect from "@/database/connectDB";
import Preset from "@/database/models/Presets";

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

