import Preset from "@/database/models/Presets";
import dbConnect from "@/database/connectDB";

export async function GET(request, {params}) {
  const { id } = params
  await dbConnect()
  const template = await Preset.findById(id)
  return Response.json(template);
}


