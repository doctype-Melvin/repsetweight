import Template from "@/database/models/Templates";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = params
    const newTemplate = await Template.findById(id)
    return NextResponse.json({ newTemplate })
}