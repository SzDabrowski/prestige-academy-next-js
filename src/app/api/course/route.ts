import { CourseModel } from "@/models/courseDataModel";
import courseData from "@/types/courseTypes";
import { connectToMongoDB } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

// Handler for GET requests
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectToMongoDB();

  try {
    const courses = await CourseModel.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  data: courseData
) {
  await connectToMongoDB();

  const course = await req.body.json();

  const newCourse: courseData = {
    title: "",
    img: "",
    data: {
      for: "",
      description: "",
      summary: "",
      timeInfo: undefined,
      recruitment: false,
      price: undefined,
      location: undefined,
      firstEvent: undefined,
    },
  };
}
