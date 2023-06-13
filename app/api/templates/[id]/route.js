import Template from "@/database/models/Templates";
import dbConnect from "@/database/connectDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    await dbConnect();
    const { id } = request.query;
    const template = await Template.findById(id);
    return NextResponse.json({ template });
}