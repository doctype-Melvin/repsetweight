import Preset from "@/database/models/Presets";
import dbConnect from "@/database/connectDB";

export async function GET(request, {params}) {
  const { id } = params
  await dbConnect()
  console.log('Connected')
  const template = await Preset.findById(id)
  console.log('Template found')
  return Response.json(template);
}


