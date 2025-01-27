"run server";

import { CourseClientType, PreschoolClientType } from "@/types/mongodbTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findClient(clientName: string, courseName: string) {
  return await prisma.courseClient.findFirst({
    where: {
      name: clientName,
      courseName: courseName,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function saveClient(clientData: CourseClientType) {
  try {
    const existingClient = await findClient(
      clientData.name,
      clientData.courseName
    );

    if (existingClient) {
      throw new Error(
        "A client with this name is already registered for the course."
      );
    }

    const post = await prisma.courseClient.create({
      data: clientData,
    });

    return post;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving client:", error.message);
      return error;
    }
  }
}

export async function findClientPreschool(
  clientName: string,
  courseName: string
) {
  return await prisma.courseClient.findFirst({
    where: {
      name: clientName,
      courseName: courseName,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function saveClientPreschool(clientData: PreschoolClientType) {
  try {
    const existingClient = await findClient(
      clientData.studentName,
      clientData.preschoolName
    );

    if (existingClient) {
      throw new Error(
        "A child with this name is already registered for the course."
      );
    }

    const post = await prisma.preschoolClient.create({
      data: clientData,
    });

    return post;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving client:", error.message);
      return error;
    }
  }
}
