import prisma from "@/utils/connectPrisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const courseClients = await prisma.courseClient.findMany();

    return new NextResponse(JSON.stringify(courseClients), { status: 200 });
  } catch (error) {
    console.error("Error fetching course clients:", error);
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while fetching course clients",
      }),
      {
        status: 500,
      }
    );
  }
};
