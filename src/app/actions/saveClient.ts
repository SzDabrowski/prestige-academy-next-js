"use server";
import { CourseClientType, PreschoolClientType } from "@/types/mongodbTypes";

import { saveClientData } from "@/app/actions/serverDB"; /**
 * Validates and saves client or preschool data using the provided token.
 *
 * Throws an error if the token is missing, or if required fields are absent in the provided client or preschool data.
 * Returns the result of the save operation if successful.
 *
 * @param token - Authentication token required for the operation
 * @param clientData - Optional client data; must include `email` and `name` if provided
 * @param preschoolData - Optional preschool data; must include `email` and `parentName` if provided
 * @returns The response from the save operation
 */

export async function saveClientAction(
  token: string,
  clientData?: CourseClientType,
  preschoolData?: PreschoolClientType
) {
  if (!token) throw new Error("Unauthorized: No token provided");

  if (!clientData && !preschoolData) {
    throw new Error(
      "Invalid data: At least one of clientData or preschoolData must be provided."
    );
  }

  if (clientData && (!clientData.email || !clientData.name)) {
    throw new Error("Invalid client data: email and name are required");
  }
  if (preschoolData && (!preschoolData.email || !preschoolData.parentName)) {
    throw new Error(
      "Invalid preschool data: email and parentName are required"
    );
  }
  try {
    const response = await saveClientData(token, clientData, preschoolData);
    return response;
  } catch (error) {
    console.error("Error in Server Action:", error);
    throw new Error("Failed to save client data.");
  }
}
