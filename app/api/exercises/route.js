import dbConnect from "@/database/connectDB";
import Exercise from "@/database/models/Exercises";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const exercises = await Exercise.find();
    return NextResponse.json(exercises);
  } catch (error) {
    console.log(error.message);
    return NextResponse.status(500).json({ message: "What is going on?" });
  }
}
