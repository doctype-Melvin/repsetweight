import Template from "@/database/models/Templates";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
    try {
    const requestData = await request.json()
    const newTemplate = await Template.create({ 
        name: requestData.templateName,
        focus: requestData.focus,
    });
    return NextResponse.json(newTemplate);
 } catch (error) {
        console.log(error);
        return NextResponse.status(500).json({ error: error.message });
    }
}