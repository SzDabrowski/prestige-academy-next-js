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

export const ContactConfirmationEmail = ({
  recipientName = defaultNotificationEmailProps.recipientName,
  notificationTitle = "Potwierdzenie otrzymania wiadomości",
  notificationDescription = defaultNotificationEmailProps.notificationDescription,
  messageData = defaultNotificationEmailProps.messageData,
  actionButtonText = "Odwiedź naszą stronę",
  actionButtonUrl = baseURL,
  year = defaultNotificationEmailProps.year,
}: NotificationEmailProps) => {
  const renderMessageSummary = () => {
    if (messageData && (messageData as ContactClientType).subject) {
      const contact = messageData as ContactClientType;
      return (
        <Container
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "6px",
            marginTop: "20px",
            border: "1px solid #e9ecef",
          }}
        >
          <Heading
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#495057",
              marginBottom: "15px",
            }}
          >
            Podsumowanie Twojej wiadomości:
          </Heading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "10px",
              fontSize: "14px",
              color: "#495057",
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
              <strong>E-mail:</strong>
            </div>
            <div>{contact.email}</div>

            <div>
              <strong>Telefon:</strong>
            </div>
            <div>{contact.phone}</div>

            <div>
              <strong>Wiadomość:</strong>
            </div>
            <div>{contact.message}</div>
          </div>
        </Container>
      );
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
          style={{ fontSize: "28px", fontWeight: 800, color: "#000000" }}
        >
          Dziękujemy za wiadomość!
        </Heading>

        <Text style={{ fontSize: "16px", color: "#71717a", marginTop: "10px" }}>
          Potwierdzenie wysłania formularza kontaktowego
        </Text>

        {/* Główna treść */}
        <Container style={{ paddingTop: "20px" }}>
          <Text
            style={{ fontSize: "16px", color: "#27272a", lineHeight: "1.6" }}
          >
            Witaj {recipientName || "Drogi Kliencie"},
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#27272a",
              lineHeight: "1.6",
              marginTop: "15px",
            }}
          >
            Dziękujemy za skontaktowanie się z nami poprzez formularz na naszej
            stronie internetowej. Twoja wiadomość została pomyślnie otrzymana i
            przekazana do odpowiedniego działu.
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#27272a",
              lineHeight: "1.6",
              marginTop: "15px",
            }}
          >
            <strong>
              Zapewniamy Cię, że ktoś z naszego zespołu wkrótce zapozna się z
              Twoją wiadomością i wyśle odpowiedź na podany adres e-mail.
            </strong>
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#27272a",
              lineHeight: "1.6",
              marginTop: "15px",
            }}
          >
            Standardowy czas odpowiedzi wynosi do 2 dni roboczych. W przypadku
            pilnych spraw prosimy o bezpośredni kontakt telefoniczny.
          </Text>
        </Container>

        {/* Podsumowanie wiadomości */}
        {renderMessageSummary()}

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
          <Hr style={{ borderColor: "#e9ecef", margin: "20px 0" }} />

          <Text
            style={{ fontSize: "14px", color: "#71717a", lineHeight: "1.5" }}
          >
            Ta wiadomość została wygenerowana automatycznie w odpowiedzi na
            wypełnienie formularza kontaktowego na naszej stronie internetowej.
            Jeśli nie wysyłałeś tej wiadomości, zignoruj ten e-mail lub{" "}
            <Link
              href={`${baseURL}/kontakt`}
              style={{ color: "#d3277d", textDecoration: "underline" }}
            >
              skontaktuj się z nami
            </Link>
            .
          </Text>

          <Text
            style={{ fontSize: "14px", color: "#71717a", marginTop: "15px" }}
          >
            Dziękujemy za zaufanie!
            <br />
            Zespół Prestige Stargard
          </Text>
        </Container>
      </Container>
    </RootEmailTemplate>
  );
};

export default ContactConfirmationEmail;
