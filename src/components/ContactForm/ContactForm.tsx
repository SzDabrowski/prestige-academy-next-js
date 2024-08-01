"use client";

import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "@/utils/formUtils";

import styles from "./ContactForm.module.scss";
import TextArea from "../TextArea/TextArea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { headers } from "next/headers";
import axios from "axios";
import { verifyReCaptcha } from "@/utils/recaptchaUtils";

interface ContactFormInputs {
  courseName?: string;
  name: string;
  email?: string;
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

  const userName = useWatch({
    control,
    name: "name",
    defaultValue: "Someone",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setValue("subject", `${userName} sent a message from Website`);
  }, [userName, setValue]);

  const onSubmit = async (data: ContactFormInputs, event?: any) => {
    event?.preventDefault();

    //const recaptchaRes = verifyReCaptcha(data, executeRecaptcha);

    const eventPromise = toast.promise(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data, null, 2),
      })
        .then(async (response) => {
          let json = await response.json();
          if (json.success) {
            setIsSuccess(true);
            setMessage(json.message);
            event.target.reset();
            reset();
            setPhoneNumber("");
            return json.message;
          } else {
            setIsSuccess(false);
            setMessage(json.message);
            throw new Error(json.message);
          }
        })
        .catch((error) => {
          setIsSuccess(false);
          setMessage(
            "Client Error. Please check the console.log for more info"
          );
          console.log(error);
          throw error;
        }),
      {
        loading: TOAST_MESSAGE.LOADING,
        success: TOAST_MESSAGE.SUCCESS,
        error: TOAST_MESSAGE.ERROR,
      }
    );

    try {
      await eventPromise;
    } catch (error) {
      console.error("Submission error:", error);
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
      <input type="hidden" {...register("subject")} />

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
      <Toaster position="bottom-center" />
      <button className={styles.button}>Wyślij wiadomość</button>
    </form>
  );
};
