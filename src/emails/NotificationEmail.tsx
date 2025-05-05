import React from "react";
import {
  NotificationEmailProps,
  defaultNotificationEmailProps,
} from "./emailProps";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

import {
  CourseClientType,
  PreschoolClientType,
  ContactClientType,
} from "@/types/mongodbTypes";
import RootEmailTemplate from "./RootEmailTemplate";

const baseURL = "https://www.prestige.stargard.pl";

export const NotificationEmail = ({
  recipientName = defaultNotificationEmailProps.recipientName,
  notificationTitle = defaultNotificationEmailProps.notificationTitle,
  notificationDescription = defaultNotificationEmailProps.notificationDescription,
  messageData = defaultNotificationEmailProps.messageData,
  actionButtonText = defaultNotificationEmailProps.actionButtonText,
  actionButtonUrl = defaultNotificationEmailProps.actionButtonUrl,
  year = defaultNotificationEmailProps.year,
}: NotificationEmailProps) => {
  const renderMessageData = () => {
    if (messageData) {
      // Check if messageData is of type CourseClientType
      if ((messageData as CourseClientType).courseName) {
        const course = messageData as CourseClientType;
        return (
          <>
            <Text style={{ fontSize: "16px", color: "#27272a" }}>
              Nowy klient zapisał się na kurs:
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr", // One column for labels, the other for data
                gap: "10px",
                fontSize: "16px",
                color: "#27272a",
                marginTop: "10px",
              }}
            >
              <div>
                <strong>Nazwa kursu:</strong>
              </div>
              <div>{course.courseName}</div>

              <div>
                <strong>Imię i nazwisko:</strong>
              </div>
              <div>{course.name}</div>

              <div>
                {course.pairName && (
                  <>
                    <strong>Imię i nazwisko partnerki/ra:</strong>
                  </>
                )}
              </div>
              <div>{course.pairName}</div>

              <div>
                <strong>Numer telefonu:</strong>
              </div>
              <div>{course.phone}</div>

              <div>
                <strong>Adres e-mail:</strong>
              </div>
              <div>{course.email}</div>
            </div>
          </>
        );
      }

      // Check if messageData is of type PreschoolClientType
      if ((messageData as PreschoolClientType).preschoolName) {
        const preschool = messageData as PreschoolClientType;
        return (
          <>
            <Text style={{ fontSize: "16px", color: "#27272a" }}>
              Nowa osoba zapisała się na kurs przedszkolny:
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // One column for labels, the other for data
                gap: "5px",
                fontSize: "16px",
                color: "#27272a",
                marginTop: "10px",
              }}
            >
              <div>
                <strong>Nazwa przedszkola:</strong>
              </div>
              <div>{preschool.preschoolName}</div>

              <div>
                <strong>Imię i nazwisko ucznia:</strong>
              </div>
              <div>{preschool.studentName}</div>

              <div>
                <strong>Nazwisko rodzica:</strong>
              </div>
              <div>{preschool.parentName}</div>

              <div>
                <strong>Numer telefonu:</strong>
              </div>
              <div>{preschool.phone}</div>

              <div>
                <strong>Adres e-mail:</strong>
              </div>
              <div>{preschool.email}</div>
            </div>
          </>
        );
      }

      // Check if messageData is of type ContactClientType
      if ((messageData as ContactClientType).subject) {
        const contact = messageData as ContactClientType;
        return (
          <>
            <Text style={{ fontSize: "16px", color: "#27272a" }}>
              Nowe zapytanie kontaktowe:
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr", // One column for labels, the other for data
                gap: "10px",
                fontSize: "16px",
                color: "#27272a",
                marginTop: "10px",
              }}
            >
              <div>
                <strong>Temat:</strong>
              </div>
              <div>{contact.subject}</div>

              <div>
                <strong>Imię i nazwisko:</strong>
              </div>
              <div>{contact.name}</div>

              <div>
                <strong>Numer telefonu:</strong>
              </div>
              <div>{contact.phone}</div>

              <div>
                <strong>Adres e-mail:</strong>
              </div>
              <div>{contact.email}</div>

              <div>
                <strong>Wiadomość:</strong>
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{contact.message}</div>
            </div>
          </>
        );
      }
    }

    return null;
  };

  return (
    <RootEmailTemplate notificationTitle={notificationTitle} year={year}>
      <Container
        style={{
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Heading
          style={{ fontSize: "24px", fontWeight: 800, color: "#000000" }}
        >
          {notificationTitle}
        </Heading>
        <Text style={{ fontSize: "16px", color: "#71717a", marginTop: "10px" }}>
          {notificationDescription}
        </Text>

        {/* Wiadomość */}
        <Container style={{ paddingTop: "20px" }}>
          <Text style={{ fontSize: "16px", color: "#27272a" }}>
            Witaj {recipientName},
          </Text>
        </Container>

        {/* Dynamic Content based on messageData */}
        {renderMessageData()}

        {/* Przycisk akcji */}
        <Container style={{ paddingTop: "30px", textAlign: "center" }}>
          <Link
            href={actionButtonUrl}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              fontSize: "16px",
              color: "#ffffff",
              backgroundColor: "#d3277d",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {actionButtonText}
          </Link>
        </Container>

        {/* Dodatkowe informacje */}
        <Container style={{ paddingTop: "30px" }}>
          <Text style={{ fontSize: "14px", color: "#71717a" }}>
            Ta wiadomosć została wygenerowana automatycznie. Jeśli nie
            oczekiwałeś tej wiadomości, zignoruj ten e-mail lub{" "}
            <Link
              href="https://example.com/contact"
              style={{ color: "#000000", textDecoration: "underline" }}
            >
              skontaktuj się z pomocą techniczną
            </Link>
            .
          </Text>
        </Container>
      </Container>
    </RootEmailTemplate>
  );
};

export default NotificationEmail;
