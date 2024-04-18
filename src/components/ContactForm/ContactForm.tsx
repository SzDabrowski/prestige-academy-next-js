"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { phoneNumberAutoFormat } from "@/utils/formUtils";

import styles from "./ContactForm.module.scss";
import TextArea from "../TextArea/TextArea";
import { ChangeEvent, useState } from "react";

interface ContactFormInputs {
  name: string;
  email?: string;
  phoneNumber: string;
  message: string;
}

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [textAreaMessage, setTextAreaMessage] = useState<string>("");

  const onSubmit = (data: ContactFormInputs, event?: any) => {
    event?.preventDefault();
    console.log(data);
    // Submit your form data here
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
  };

  const handleTextArea = (value: string) => {
    setTextAreaMessage(value);
    setValue("message", textAreaMessage);
    return value;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={styles.label}>
        <span>Imię i nazwisko:</span>
        <input
          className={errors.name ? styles.errorOutline : ``}
          id="name"
          type="text"
          {...register("name", {
            required: "To pole jest wymagane",
            minLength: {
              value: 3,
              message: "Imię i nazwisko musi mieć co najmniej 3 znaki",
            },
          })}
          placeholder="Jan Kowalski"
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.label}>
        <span>Adres email:</span>
        <input
          className={errors.email ? styles.errorOutline : ``}
          id="email"
          type="email"
          {...register("email", {
            // required: "To pole jest wymagane",
            pattern: {
              value: /^[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Wprowadź poprawny adres email",
            },
          })}
          placeholder="Twój adres email"
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </label>

      <label className={styles.label}>
        <span>Numer telefonu:</span>
        <input
          className={errors.phoneNumber ? styles.errorOutline : ``}
          id="tel"
          type="tel"
          {...register("phoneNumber", {
            required: "To pole jest wymagane",
            pattern: {
              value: /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/,
              message: "Wprowadź poprawny numer telefonu (np. 123 123 123)",
            },
            setValueAs: (value) => phoneNumberAutoFormat(value),
          })}
          placeholder="Numer telefonu"
          onChange={onChangePhoneNumber}
          value={phoneNumber}
        />
        {errors.phoneNumber && (
          <span className={styles.error}>{errors.phoneNumber.message}</span>
        )}
      </label>
      <label className={styles.label}>
        <span>Twoja wiadomość:</span>
        <TextArea getValue={handleTextArea} />
        <input
          type="hidden"
          {...register("message", {
            required: "To pole jest wymagane",
            minLength: {
              value: 10,
              message: "wiadomość musi mieć co najmniej 10 znaków",
            },
          })}
          value={textAreaMessage}
        />
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}
      </label>
      <button className={styles.button}>Wyślij wiadomość</button>
    </form>
  );
};
