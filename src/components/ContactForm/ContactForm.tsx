"use client";

import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "../../utils/formUtils";
import LoadingLogo from "../LoadingLogo/LoadingLogo";

import styles from "./ContactForm.module.scss";
import TextArea from "../TextArea/TextArea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { headers } from "next/headers";
import axios from "axios";
import { verifyReCaptcha } from "../../utils/recaptchaUtils";

import { sendContactMessage } from "@/app/actions/serverDB";
import { ContactClientType } from "@/types/mongodbTypes";

import { useTokenStore } from "@/app/hooks/useTokenStore";
import { fetchServerToken } from "@/app/actions/serverDB";
import {
  sendNotificationEmail,
  sendContactConfirmationEmail,
} from "@/app/actions/sendNotification";
export interface ContactFormInputs {
  courseName?: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  access_key: string;
  subject: string;
}

interface ContactForm {
  courseName?: string;
}

export const ContactForm = (props: ContactForm) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormInputs>({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [textAreaMessage, setTextAreaMessage] = useState<string>("");

  const { guestToken, setGuestToken } = useTokenStore();
  const [loading, setLoading] = useState<boolean>(true);

  const userName = useWatch({
    control,
    name: "name",
    defaultValue: "Someone",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await fetchServerToken();

        setGuestToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        setLoading(false);
      }
    };

    if (guestToken === null) {
      fetchToken();
    }
  }, []);

  // useEffect(() => {
  //   console.log("Updated guestToken:", guestToken);
  // }, [guestToken]);

  const onSubmit = async (data: ContactFormInputs, event?: any) => {
    event?.preventDefault();

    //const recaptchaRes = verifyReCaptcha(data, executeRecaptcha);
    try {
      if (!guestToken) {
        toast.error(TOAST_MESSAGE.NO_TOKEN);
        return;
      }

      const contactData: ContactClientType = {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        subject: data.subject,
        message: data.message,
      };

      await toast.promise(
        sendContactMessage(contactData, guestToken), // Use server action
        {
          loading: "Zapisywanie...",
          success: "Zapisano pomyślnie!",
          error: "Błąd podczas zapisu",
        }
      );
      await sendNotificationEmail(
        guestToken,
        undefined,
        undefined,
        contactData
      );

      try {
        await sendContactConfirmationEmail(guestToken, contactData);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      setIsSuccess(true);
      setMessage("Wiadomość została wysłana pomyślnie!");
      reset();
      setPhoneNumber("");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Błąd zapisu. Spróbuj ponownie.");
      console.error("Error submitting form:", error);
    }
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
      <input
        type="hidden"
        value={process.env.NEXT_PUBLIC_WEBFORM_ACCES_KEY}
        {...register("access_key")}
      />

      {props.courseName ? (
        <input
          type="hidden"
          value={props.courseName}
          {...register("courseName")}
        />
      ) : (
        ""
      )}
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
              value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
        <span>Temat:</span>
        <input
          className={errors.subject ? styles.errorOutline : ``}
          id="subject"
          type="text"
          {...register("subject", {
            required: "To pole jest wymagane",
            minLength: {
              value: 10,
              message: "Temat musi mieć co najmniej 10 znaków",
            },
          })}
          placeholder="Temat"
        />
        {errors.subject && (
          <span className={styles.error}>{errors.subject.message}</span>
        )}
      </label>

      <label className={styles.label}>
        <span>Twoja wiadomość:</span>
        <TextArea
          getValue={handleTextArea}
          resetTextArea={isSubmitSuccessful}
        />

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
      <Toaster
        position="top-center"
        containerStyle={{
          top: 200,
        }}
      />
      <button className={styles.button} disabled={loading || isSubmitting}>
        {loading ? "Ładowanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
};
