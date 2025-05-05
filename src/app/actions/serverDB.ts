import axios from "axios";
import {
  CourseClientType,
  PreschoolClientType,
  ContactClientType,
} from "@/types/mongodbTypes";

export const fetchServerToken = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/GuestToken`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (!data.token) {
      throw new Error("No token found in the server response");
    }

    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to fetch guest token");
  }
};

export const saveClientData = async (
  token: string,
  clientData?: CourseClientType,
  preschoolData?: PreschoolClientType
) => {
  if (!clientData && !preschoolData) {
    throw new Error("Either clientData or preschoolData must be provided.");
  }
  if (!token) throw new Error("Unauthorized: No token provided");

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/forms/saveData`,
      { clientData, preschoolData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};

export const sendContactMessage = async (
  data: ContactClientType,
  token: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/forms/contact`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};
