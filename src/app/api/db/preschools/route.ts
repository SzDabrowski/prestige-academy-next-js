import prisma from "@/utils/connectPrisma";
import { NextRequest, NextResponse } from "next/server";

import { saveClientPreschool } from "@/utils/prismaUtils";
import { PreschoolClientType } from "@/types/mongodbTypes";

export const GET = async () => {
  try {
    const courseClients = await prisma.preschoolClient.findMany();

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

export async function POST(request: NextRequest) {
  try {
    const body: PreschoolClientType = await request.json();

    console.log(body);

    const result = await saveClientPreschool(body);

    if (result instanceof Error) {
      return new NextResponse(JSON.stringify({ error: result.message }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({ success: true, message: "Sukces!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving client:", error);
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
      }
    );
  }
}
