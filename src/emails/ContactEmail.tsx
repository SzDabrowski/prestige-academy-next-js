import React from "react";
import { ContactEmailProps, defaultContactEmailProps } from "./emailProps";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from "@react-email/components";
import RootEmailTemplate from "./RootEmailTemplate";

const ContactEmail = ({
  recipientName = defaultContactEmailProps.recipientName,
  subject = defaultContactEmailProps.subject,
  message = defaultContactEmailProps.message,
  senderEmail = defaultContactEmailProps.senderEmail,
  senderName = defaultContactEmailProps.senderName,
  senderPhone = defaultContactEmailProps.senderPhone,
  year = defaultContactEmailProps.year,
}: ContactEmailProps) => {
  return (
    <RootEmailTemplate
      notificationTitle="Nowe zapytanie kontaktowe"
      year={year}
    >
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
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#000000",
            marginBottom: "0px",
          }}
        >
          Nowa wiadomość w formularzu kontaktowym!
        </Heading>
        <Text style={{ fontSize: "16px", color: "#71717a", marginTop: "10px" }}>
          Ktoś wypełnił formularz kontaktowy na naszej stronie
        </Text>

        <Text style={{ fontSize: "16px", color: "#27272a" }}>
          Masz nowe zapytanie kontaktowe od {senderName}.
        </Text>

        <Text style={{ fontSize: "16px", color: "#27272a" }}>
          <strong>Treść wiadomości:</strong>
          <br />
          {message}
        </Text>

        <Text style={{ fontSize: "16px", color: "#27272a" }}>
          <strong>Adres e-mail:</strong> {senderEmail}
          <br />
          <strong>Numer telefonu:</strong> {senderPhone}
        </Text>
      </Container>
    </RootEmailTemplate>
  );
};

export default ContactEmail;
