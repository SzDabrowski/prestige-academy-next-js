"use server";

import { CourseClientType, PreschoolClientType } from "@/types/mongodbTypes";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Retrieves the first course client matching the specified client name and course name.
 *
 * @param clientName - The name of the client to search for
 * @param courseName - The name of the course associated with the client
 * @returns The first matching course client record, or null if none is found
 */
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

/**
 * Saves a new course client to the database after ensuring no duplicate exists for the same name and course.
 *
 * Throws an error if a client with the same name is already registered for the course.
 *
 * @param clientData - The data for the course client to be saved
 * @returns The newly created course client record
 */
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
      throw error;
    }
    throw new Error("Unknown error occurred while saving client");
  }
}

/**
 * Retrieves the first course client record matching the specified client name and course name.
 *
 * @param clientName - The name of the client to search for
 * @param courseName - The name of the course to search for
 * @returns The first matching course client record, or `null` if none is found
 */
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

/**
 * Saves a new preschool client to the database if no duplicate exists.
 *
 * Checks for an existing preschool client with the same student and preschool name. If a duplicate is found, throws an error. On success, creates and returns the new preschool client record. If an error occurs, logs the error and returns the error object.
 *
 * @param clientData - The preschool client data to be saved
 * @returns The created preschool client record, or an Error object if saving fails
 */
export async function saveClientPreschool(clientData: PreschoolClientType) {
  try {
    const existingClient = await findClientPreschool(
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
