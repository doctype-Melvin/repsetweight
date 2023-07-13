import Preset from "@/database/models/Presets";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;
  const newTemplate = await Preset.findById(id);
  return NextResponse.json({ newTemplate });
}

export async function PATCH(request, { params }) {
  await dbConnect();
  const { id } = params;
  await Preset.findByIdAndUpdate(id, { isCurrent: true})
  return NextResponse.alert('Template set to current');
}

// Create the endpoint to update and to delete
// an individual template
