"use client";

import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "@/utils/formUtils";

import styles from "./ContactForm.module.scss";
import TextArea from "../TextArea/TextArea";
import { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";

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

  useEffect(() => {
    setValue("subject", `${userName} sent a message from Website`);
  }, [userName, setValue]);

  const onSubmit = async (data: ContactFormInputs, event?: any) => {
    event?.preventDefault();
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
            return json.message; // Returning a success message for toast.promise
          } else {
            setIsSuccess(false);
            setMessage(json.message);
            throw new Error(json.message); // Throwing an error to trigger the reject state in toast.promise
          }
        })
        .catch((error) => {
          setIsSuccess(false);
          setMessage(
            "Client Error. Please check the console.log for more info"
          );
          console.log(error);
          throw error; // Throwing error to trigger reject state in toast.promise
        }),
      {
        loading: TOAST_MESSAGE.LOADING,
        success: TOAST_MESSAGE.SUCCESS,
        error: TOAST_MESSAGE.ERROR,
      }
    );

    try {
      await eventPromise; // Await the eventPromise to ensure proper flow control
    } catch (error) {
      // Handle any additional error logic if needed
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
      <button className={styles.button}>Wyślij wiadomość</button>
      {isSubmitSuccessful && !isSuccess && (
        <div className="flex flex-col items-center justify-center text-center text-white rounded-md">
          <svg
            width="97"
            height="97"
            viewBox="0 0 97 97"
            className="text-red-400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9995 69C43.6205 53.379 52.3786 44.621 67.9995 29M26.8077 29L67.9995 69M48.2189 95C42.0906 95 36.0222 93.7929 30.3604 91.4477C24.6985 89.1025 19.554 85.6651 15.2206 81.3316C10.8872 76.9982 7.44975 71.8538 5.10454 66.1919C2.75932 60.53 1.55225 54.4617 1.55225 48.3333C1.55225 42.205 2.75932 36.1366 5.10454 30.4748C7.44975 24.8129 10.8872 19.6684 15.2206 15.335C19.554 11.0016 24.6985 7.56418 30.3604 5.21896C36.0222 2.87374 42.0906 1.66667 48.2189 1.66667C60.5957 1.66667 72.4655 6.58333 81.2172 15.335C89.9689 24.0867 94.8856 35.9566 94.8856 48.3333C94.8856 60.7101 89.9689 72.58 81.2172 81.3316C72.4655 90.0833 60.5957 95 48.2189 95Z"
              stroke="CurrentColor"
              strokeWidth="3"
            />
          </svg>

          <h3 className="text-2xl text-red-400 py-7">
            Oops, Something went wrong!
          </h3>
          <p className="text-gray-300 md:px-3">{Message}</p>
          <button className="mt-5 focus:outline-none" onClick={() => reset()}>
            Try Again
          </button>
        </div>
      )}
    </form>
  );
};
