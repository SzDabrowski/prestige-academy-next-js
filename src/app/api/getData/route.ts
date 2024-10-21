import prisma from "@/utils/connectPrisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const courseClients = await prisma.courseClient.findMany();
    console.log(process.env.MONGODB_URI);

    return new NextResponse(JSON.stringify(courseClients), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching course clients:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
