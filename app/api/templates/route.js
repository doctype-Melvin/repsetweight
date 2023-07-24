import Preset from "@/database/models/Presets";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  console.log('Connected to DB')
  try {
    const templates = await Preset.find();
    return NextResponse.json(templates);
  } catch (error) {
    console.log(error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
