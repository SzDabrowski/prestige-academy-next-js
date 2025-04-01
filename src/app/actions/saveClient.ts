"use server";

import { saveClientData } from "@/app/actions/serverDB"; // Your existing client action

export async function saveClientAction(
  token: string,
  clientData?: any,
  preschoolData?: any
) {
  if (!token) throw new Error("Unauthorized: No token provided");
  try {
    const response = await saveClientData(clientData, preschoolData);
    return response;
  } catch (error) {
    console.error("Error in Server Action:", error);
    throw new Error("Failed to save client data.");
  }
}
