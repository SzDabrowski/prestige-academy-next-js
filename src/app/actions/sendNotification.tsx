import axios from "axios";
import { CourseClientType, PreschoolClientType } from "@/types/mongodbTypes";
import { NotificationEmailProps } from "@/emails/emailProps";
import NotificationEmail from "@/emails/NotificationEmail";

import { render } from "@react-email/components";

export const sendNotificationEmail = async (
  token: string,
  clientData?: CourseClientType,
  preschoolData?: PreschoolClientType
): Promise<void> => {
  if (!clientData && !preschoolData) {
    throw new Error("Either clientData or preschoolData must be provided.");
  }
  if (!token) throw new Error("Unauthorized: No token provided");

  try {
    // Create the email data object
    const emailData: NotificationEmailProps = {
      recipientName: "Krystian",
      notificationTitle: "Nowe powiadomienie",
      notificationDescription: "Mamy dla Ciebie ważne informacje",
      actionButtonText: "Zobacz szczegóły",
      actionButtonUrl: "https://example.com/notification",
      year: new Date().getFullYear(),
      messageData: clientData! || preschoolData!, // Ensure either clientData or preschoolData is passed
    };

    // Render the email content using ReactDOMServer
    const html = await render(<NotificationEmail {...emailData} />);

    // Send the email data via axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/mailing/notification`,
      { html }, // HTML email content
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check for successful response
    if (response.status !== 200) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = response.data;

    // // Check for token in response
    // if (!data.token) {
    //   throw new Error("No token found in the server response");
    // }

    return;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send notification email");
  }
};
