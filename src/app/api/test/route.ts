import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { CourseModel } from "@/models/courseDataModel";

export async function GET() {
  try {
    await connectToMongoDB(); // Connect to the database

    const courses = await CourseModel.find(); // Fetch all courses
    return NextResponse.json(courses); // Return the courses as JSON
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}
//add data to mongo db
