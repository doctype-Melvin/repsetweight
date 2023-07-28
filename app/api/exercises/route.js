import dbConnect from "@/database/connectDB";
import Exercise from "@/database/models/Exercises";

export async function GET() {
  await dbConnect();
  try {
    const exercises = await Exercise.find();
    return Response.json(exercises);
  } catch (error) {
    console.log(error.message);
    return Response.status(500).json({ message: "What is going on?" });
  }
}
