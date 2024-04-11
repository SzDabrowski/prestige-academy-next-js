"use client";

import styles from "./ContactForm.module.scss";
import TextArea from "../TextArea/TextArea";

export const ContactForm = () => {
  return (
    <form
      action="
			"
    >
      <input type="text" placeholder="Nazwisko" className={styles.input} />
      <input type="text" placeholder="Adres Email" className={styles.input} />
      <input
        type="text"
        placeholder="Numer Telefonu"
        className={styles.input}
      />
      <TextArea />
      <button className={styles.button}>Wyślij wiadomość</button>
    </form>
  );
};
