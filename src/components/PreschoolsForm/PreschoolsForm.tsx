"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "../../utils/formUtils";

import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";

import preschoolsData from "@/data/preschools.json";

import styles from "./PreschoolsForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyReCaptcha } from "@/utils/recaptchaUtils";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface FormInputs {
  selectedPreschool: string;
  group_name: string;
  child_name: string;
  parent_name: string;
  email: string;
  phone: string;
  subject: string;
  access_key: string;
}

const PreschoolsForm = () => {
  const [selectedPreschool, setselectedPreschool] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleDropdownSelect = (value: string) => {
    setselectedPreschool(value);
    console.log(value);
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState("");
  const [capVal, setCapVal] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onTouched",
  });

  const userName = useWatch({
    control,
    name: "child_name",
    defaultValue: "Someone",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setValue("selectedPreschool", selectedPreschool);
  }, [selectedPreschool]);

  useEffect(() => {
    setValue(
      "subject",
      `${userName} zapisał/a się na zajęcia w przedszkolu - ${selectedPreschool}`
    );
  }, [userName, selectedPreschool]);

  const preschoolsNames = preschoolsData.map((course) => course.value);

  const onSubmit = async (data: FormInputs, event?: any) => {
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
      },
      {
        success: {
          duration: 5000,
        },
      }
    );

    try {
      await eventPromise;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input
          type="hidden"
          value={process.env.NEXT_PUBLIC_WEBFORM_ACCES_KEY}
          {...register("access_key")}
        />
        <input type="hidden" {...register("subject")} />

        <div className={styles.inputsContainer}>
          <label className={`${styles.label} ${styles.dropdown}`}>
            <DropdownSelect
              title={"Wybierz przedszkole"}
              options={preschoolsNames}
              placeholder={"Wybierz przedszkole"}
              getValue={handleDropdownSelect}
            />

            <input
              type="hidden"
              {...register("selectedPreschool", {
                required: "To pole jest wymagane",
              })}
              value={selectedPreschool}
            />

            {errors.selectedPreschool && selectedPreschool == "" && (
              <span className={styles.dropdownError}>
                {errors.selectedPreschool?.message}
              </span>
            )}
          </label>

          <label className={styles.label}>
            <span>Nazwa grupy</span>
            <input
              id="group_name"
              type="text"
              {...register("group_name", {
                required: "To pole jest wymagane",
                minLength: {
                  value: 3,
                  message: "Nazwa grupy musi mieć co najmniej 3 znaki",
                },
              })}
              placeholder="Grupa abc"
            />
            {errors.group_name && (
              <span className={styles.error}>{errors.group_name.message}</span>
            )}
          </label>

          <label className={styles.label}>
            <span>Imię i nazwisko dziecka</span>
            <input
              id="child_name"
              type="text"
              {...register("child_name", {
                required: "To pole jest wymagane",
                minLength: {
                  value: 3,
                  message: "Imię i nazwisko musi mieć co najmniej 3 znaki",
                },
              })}
              placeholder="Jaś Kowalski"
            />
            {errors.child_name && (
              <span className={styles.error}>{errors.child_name.message}</span>
            )}
          </label>

          <label className={styles.label}>
            <span>Imię i nazwisko rodzica</span>
            <input
              id="parent_name"
              type="text"
              {...register("parent_name", {
                required: "To pole jest wymagane",
                minLength: {
                  value: 3,
                  message: "Imię i nazwisko musi mieć co najmniej 3 znaki",
                },
              })}
              placeholder="Jan Kowalski"
            />
            {errors.parent_name && (
              <span className={styles.error}>{errors.parent_name.message}</span>
            )}
          </label>

          <label className={styles.label}>
            <span>Adres email</span>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "To pole jest wymagane",
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
            <span>Numer telefonu</span>
            <input
              id="tel"
              type="tel"
              {...register("phone", {
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
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </label>
        </div>

        <input
          className={styles.button}
          type="submit"
          value="Wyślij zgłoszenie!"
          // disabled={!capVal}
        />
      </form>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 200,
        }}
      />
      <Toaster
        position="top-center"
        containerStyle={{
          top: 200,
        }}
      />
    </div>
  );
};

export default PreschoolsForm;
function verifyReCaptchaeCaptcha(
  data: FormInputs,
  executeRecaptcha: ((action?: string) => Promise<string>) | undefined
) {
  throw new Error("Function not implemented.");
}
