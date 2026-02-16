"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "../../utils/formUtils";

import styles from "./DanceEventForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { plRegex } from "../../utils/formUtils";

import LoadingLogo from "../LoadingLogo/LoadingLogo";

import { saveClientData } from "@/app/actions/serverDB";
import { fetchPreschoolsList } from "@/lib/contentful/serverActions/coursesGroups";

import { useTokenStore } from "@/app/hooks/useTokenStore";
import { sendNotificationEmail } from "@/app/actions/sendNotification";

import { EventClientType } from "@/types/mongodbTypes";
import { fetchServerToken } from "@/app/actions/serverDB";

interface FormInputs {
  selectedPreschool: string;
  groupName: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  access_key: string;
  consentParticipation: boolean;
  consentDataProcessing: boolean;
}

interface iCourseForm {
  selectedDanceCourse?: string;
  onSuccess: () => void;
}

const DanceEventForm = (props: iCourseForm) => {
  const { guestToken, setGuestToken } = useTokenStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPreschool, setselectedPreschool] = useState("");
  const [preschoolsList, setPreschoolsList] = useState<string[]>([]);
  const [preschoolsListLoading, setPreschoolsListLoading] =
    useState<boolean>(true);

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [Message, setMessage] = useState("");
  const [capVal, setCapVal] = useState(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      consentParticipation: false,
      consentDataProcessing: false,
    },
  });

  const userName = useWatch({
    control,
    name: "name",
    defaultValue: "...",
  });

  const handleDropdownSelect = (value: string) => {
    setselectedPreschool(value);
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
  };

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
    } else {
      setLoading(false);
    }
  }, []); // Remove dependencies to prevent infinite loop

  useEffect(() => {
    const getData = async () => {
      setPreschoolsListLoading(true);
      try {
        const fetchedDataChildren = await fetchPreschoolsList({
          preview: false,
        });

        if (!fetchedDataChildren) throw new Error("No data received");

        // fetchedDataChildren.preschoolName is already string[]
        setPreschoolsList(
          (fetchedDataChildren.preschoolName ?? []) as unknown as string[],
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPreschoolsListLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setValue("selectedPreschool", selectedPreschool);
  }, [selectedPreschool]);

  useEffect(() => {
    setValue("subject", `${userName} zapisała/ł się na kurs tanća`);
  }, [userName, setValue]);

  const onSubmit = async (data: FormInputs, event?: any) => {
    event?.preventDefault();

    if (!guestToken) {
      toast.error(TOAST_MESSAGE.NO_TOKEN);
      return;
    }

    const eventData: EventClientType = {
      schoolName: data.selectedPreschool,
      groupName: data.groupName || "",
      name: data.name,
      phone: data.phone,
    };

    try {
      await toast.promise(
        saveClientData(guestToken, undefined, undefined, eventData), // Use server action
        {
          loading: "Zapisywanie...",
          success: "Zapisano pomyślnie!",
          error: "Błąd podczas zapisu",
        },
      );
      // await sendNotificationEmail(guestToken, eventData);

      setIsSuccess(true);
      props.onSuccess();
      setMessage("Dane zapisane!");
      reset();
      setPhoneNumber("");
      setselectedPreschool("");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Błąd zapisu. Spróbuj ponownie.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      {loading ? (
        <LoadingLogo />
      ) : (
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
                title={"Wybierz szkołę"}
                options={preschoolsList}
                placeholder={"Wybierz szkołę"}
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
                {...register("groupName", {
                  required: "To pole jest wymagane",
                  minLength: {
                    value: 3,
                    message: "Nazwa grupy musi mieć co najmniej 3 znaki",
                  },
                })}
                placeholder="Grupa abc"
              />
              {errors.groupName && (
                <span className={styles.error}>{errors.groupName.message}</span>
              )}
            </label>

            <label className={styles.label}>
              <span>Imię i nazwisko dziecka</span>
              <input
                id="child_name"
                type="text"
                {...register("name", {
                  required: "To pole jest wymagane",
                  pattern: {
                    value: plRegex,
                    message: "Usuń cyfry i znaki specjalne",
                  },
                  minLength: {
                    value: 3,
                    message: "Imię i nazwisko musi mieć co najmniej 3 znaki",
                  },
                })}
                placeholder="Jaś Kowalski"
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
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
                    value: /^[0-9]{3} [0-9]{3} [0-9]{3}$/,
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

          <div className={styles.consentsSection}>
            <div className={styles.consentRow}>
              <input
                id="consentParticipation"
                type="checkbox"
                className={styles.consentCheckbox}
                {...register("consentParticipation", {
                  required: "Zgoda na udział jest wymagana",
                })}
              />
              <div className={styles.consentText}>
                <label htmlFor="consentParticipation">
                  Wyrażam zgodę na udział mojego dziecka{" "}
                  <b>{userName || "..."}</b> w wydarzeniu Tańczące Gwiazdeczki
                  2026 oraz na wykorzystanie wizerunku w celach promocyjnych
                  wydarzenia.
                </label>
                {errors.consentParticipation && (
                  <span className={styles.error}>
                    {errors.consentParticipation.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.consentRow}>
              <input
                id="consentDataProcessing"
                type="checkbox"
                className={styles.consentCheckbox}
                {...register("consentDataProcessing", {
                  required: "Zgoda na przetwarzanie danych jest wymagana",
                })}
              />
              <div className={styles.consentText}>
                <label htmlFor="consentDataProcessing">
                  Wyrażam zgodę na przetwarzanie danych osobowych moich oraz
                  mojego dziecka w celu realizacji zgłoszenia oraz kontaktu w
                  sprawach organizacyjnych zgodnie z{" "}
                  <a
                    href="https://www.prestige.stargard.pl/docs/polityka_prywatnosci.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="consent-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    polityką prywatności
                  </a>{" "}
                  i RODO.
                </label>
                {errors.consentDataProcessing && (
                  <span className={styles.error}>
                    {errors.consentDataProcessing.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <input
            className={styles.button}
            type="submit"
            value="Zapisz swoje dziecko!"
            disabled={isSubmitting}
          />
        </form>
      )}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 200,
        }}
      />
    </div>
  );
};

export default DanceEventForm;
