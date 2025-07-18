import {
  CourseClientType,
  PreschoolClientType,
  ContactClientType,
} from "@/types/mongodbTypes";

export interface NotificationEmailProps {
  recipientName: string;
  notificationTitle: string;
  notificationDescription: string;
  messageData: CourseClientType | PreschoolClientType | ContactClientType;
  actionButtonText: string;
  actionButtonUrl: string;
  year: number;
}

export interface ContactEmailProps {
  recipientName: string;
  subject: string;
  message: string;
  senderEmail: string;
  senderName: string;
  senderPhone: string;
  year: number;
}

const mockCourseClient: CourseClientType = {
  name: "Jan Kowalski",
  phone: "123-456-789",
  email: "jan.kowalski@example.com",
  courseName: "Zaawansowany Kurs Tańca",
  pairName: "Anna Nowak",
  // Add any other necessary fields from CourseClientType
};

const mockContactClient: ContactClientType = {
  name: "Jan Kowalski",
  phone: "123-456-789",
  email: "jan.kowalski@example.com",
  subject: "Zapytanie o ofertę",
  message:
    "Dzień dobry, chciałbym uzyskać więcej informacji o oferowanych kursach. Pozdrawiam, Jan Kowalski",
};

export const defaultNotificationEmailProps: NotificationEmailProps = {
  recipientName: "Krystian",
  notificationTitle: "Nowe powiadomienie",
  notificationDescription: "Mamy dla Ciebie ważne aktualizacje",
  actionButtonText: "Zobacz szczegóły",
  actionButtonUrl: "https://admin.prestige.stargard.pl/dashboard/clients",
  year: new Date().getFullYear(),
  messageData: mockCourseClient, // Using the mock data here
};

export const defaultContactEmailProps: ContactEmailProps = {
  recipientName: "Owner",
  subject: "Nowe zapytanie kontaktowe",
  message:
    "Witam, Mam pytanie dotyczące oferty Państwa kursów. Zainteresowałem się kilkoma programami, ale chciałbym uzyskać więcej informacji na temat dostępnych terminów, poziomów zaawansowania oraz kosztów. Czy istnieje możliwość, aby otrzymać szczegółowe informacje o programie 'Zaawansowany Kurs Tańca'? Dodatkowo chciałbym zapytać, czy oferujecie zniżki na kursy dla par, ponieważ planuję zapisać się wraz z partnerką. Chciałbym również dowiedzieć się, jakie są zasady zapisów i jakie dokumenty należy dostarczyć, aby formalnie dołączyć do kursu. Będę wdzięczny za szybką odpowiedź. Z góry dziękuję i pozdrawiam, Jan Kowalski",
  senderEmail: "jan.kowalski@example.com",
  senderName: "Jan Kowalski",
  senderPhone: "123-456-789",
  year: new Date().getFullYear(),
};

// Example of creating notification props for a contact form submission
export const createContactNotificationProps = (
  contactData: ContactClientType
): NotificationEmailProps => {
  return {
    recipientName: "Administrator",
    notificationTitle: "Nowe zapytanie kontaktowe",
    notificationDescription: `Otrzymałeś nowe zapytanie od ${contactData.name}`,
    messageData: contactData,
    actionButtonText: "Odpowiedz",
    actionButtonUrl: "https://admin.prestige.stargard.pl/dashboard/messages",
    year: new Date().getFullYear(),
  };
};
