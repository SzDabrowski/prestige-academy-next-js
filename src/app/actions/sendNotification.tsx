import axios from "axios";
import {
  CourseClientType,
  PreschoolClientType,
  ContactClientType,
} from "@/types/mongodbTypes";
import { NotificationEmailProps } from "@/emails/emailProps";
import NotificationEmail from "@/emails/NotificationEmail";

import { render } from "@react-email/components";

export const sendNotificationEmail = async (
  token: string,
  clientData?: CourseClientType,
  preschoolData?: PreschoolClientType,
  contactData?: ContactClientType
): Promise<void> => {
  if (!clientData && !preschoolData && !contactData) {
    throw new Error("Data must be provided.");
  }
  if (!token) throw new Error("Unauthorized: No token provided");

  try {
    // Determine which data to use and create appropriate notification content
    let messageData: CourseClientType | PreschoolClientType | ContactClientType;
    let notificationTitle = "Nowe powiadomienie";
    let notificationDescription = "Mamy dla Ciebie ważne informacje";
    let actionButtonText = "Zobacz szczegóły";
    let actionButtonUrl = "https://admin.prestige.stargard.pl/dashboard";

    if (clientData) {
      messageData = clientData;
      notificationTitle = "Nowy klient kursu";
      notificationDescription = `Nowy klient zapisał się na kurs: ${clientData.courseName}`;
      actionButtonUrl = "https://admin.prestige.stargard.pl/dashboard/clients";
    } else if (preschoolData) {
      messageData = preschoolData;
      notificationTitle = "Nowy zapis przedszkolny";
      notificationDescription = `Nowy zapis na kurs przedszkolny: ${preschoolData.preschoolName}`;
      actionButtonUrl =
        "https://admin.prestige.stargard.pl/dashboard/preschool";
    } else if (contactData) {
      messageData = contactData;
      notificationTitle = "Nowe zapytanie kontaktowe";
      notificationDescription = `Otrzymałeś nowe zapytanie od ${contactData.name}`;
      actionButtonUrl = "https://admin.prestige.stargard.pl/dashboard/messages";
    } else {
      throw new Error("No data provided for notification email");
    }

    // Create the email data object
    const emailData: NotificationEmailProps = {
      recipientName: "Krystian",
      notificationTitle,
      notificationDescription,
      actionButtonText,
      actionButtonUrl,
      year: new Date().getFullYear(),
      messageData,
    };

    // Render the email content using ReactDOMServer
    const html = await render(<NotificationEmail {...emailData} />);

    // Send the email data via axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/mailing/email/notification`,
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

    return;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send notification email");
  }
};
