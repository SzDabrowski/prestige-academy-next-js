"use client";

import { Container } from "@/components/Container/Container";
import styles from "./Contact.module.scss";
import { MapComponent } from "./MapComponent";
import companyInfo from "../../../data/companyInfo.json";
import { ContactForm } from "@/components/ContactForm/ContactForm";

export const Contact = () => {
  return (
    <section className={styles.main}>
      <Container>
        <div className={styles.title}>
          <h1>Kontakt</h1>
          <span>Jesteśmy tu, aby pomóc.</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.textContent}>
            <h2>Skontaktuj się z nami!</h2>
            <p>
              Masz jakieś pytania? Jesteśmy tutaj, aby pomóc. Wypełnij
              formularz, wyślij e-mail lub zadzwoń.
            </p>
            <span>{companyInfo.contact.adress}</span>
            <span>{companyInfo.contact.email}</span>
            <span>{companyInfo.contact.phoneNumber}</span>
          </div>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </div>
      </Container>
      <MapComponent />
    </section>
  );
};
