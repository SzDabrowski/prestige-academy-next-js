"use server";
import { CourseClientType, PreschoolClientType } from "@/types/mongodbTypes";

import { saveClientData } from "@/app/actions/serverDB"; // Your existing client action

export async function saveClientAction(
  token: string,
  clientData?: CourseClientType,
  preschoolData?: PreschoolClientType
) {
  if (!token) throw new Error("Unauthorized: No token provided");
  if (clientData && (!clientData.email || !clientData.name)) {
    throw new Error("Invalid client data: email and name are required");
  }
  if (preschoolData && (!preschoolData.email || !preschoolData.parentName)) {
    throw new Error("Invalid preschool data: email and name are required");
  }
  try {
    const response = await saveClientData(token, clientData, preschoolData);
    return response;
  } catch (error) {
    console.error("Error in Server Action:", error);
    throw new Error("Failed to save client data.");
  }
}
