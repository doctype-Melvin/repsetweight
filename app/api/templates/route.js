import Template from "@/database/models/Templates";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const requestData = await request.json();
    const newTemplate = await Template.create({
      name: requestData.templateName,
      focus: requestData.focus,
    });
    console.log(`Created new template with name ${newTemplate.name}`);
    return NextResponse.json(newTemplate);
  } catch (error) {
    console.log(error);
    return NextResponse.status(500).json({ error: error.message });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const templates = await Template.find();
    return NextResponse.json(templates);
  } catch (error) {
    console.log(error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
