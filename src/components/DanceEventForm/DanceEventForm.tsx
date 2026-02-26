"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, useWatch } from "react-hook-form";
import { phoneNumberAutoFormat, plRegex } from "../../utils/formUtils";
import styles from "./DanceEventForm.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import LoadingLogo from "../LoadingLogo/LoadingLogo";

// Import akcji serwerowych i typów
import {
  fetchServerToken,
  sendEventRegistration,
} from "@/app/actions/serverDB";
import { fetchPreschoolsList } from "@/lib/contentful/serverActions/coursesGroups";
import { useTokenStore } from "@/app/hooks/useTokenStore";
import { EventClientType } from "@/types/mongodbTypes";

interface FormInputs {
  selectedPreschool: string;
  groupName: string;
  name: string;
  phone: string;
  subject: string;
  consentParticipation: boolean;
  consentDataProcessing: boolean;
}

interface iCourseForm {
  onSuccess: () => void;
}

const DanceEventForm = (props: iCourseForm) => {
  const { guestToken, setGuestToken } = useTokenStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPreschool, setselectedPreschool] = useState("");
  const [preschoolsList, setPreschoolsList] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError, // Dodane do obsługi błędów z backendu
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      consentParticipation: false,
      consentDataProcessing: false,
    },
  });

  const userName = useWatch({ control, name: "name", defaultValue: "..." });

  // Inicjalizacja tokena i pobieranie listy placówek
  useEffect(() => {
    const initData = async () => {
      try {
        // Token
        if (!guestToken) {
          const token = await fetchServerToken();
          setGuestToken(token);
        }

        // Lista przedszkoli
        const fetchedData = await fetchPreschoolsList({ preview: false });
        if (fetchedData?.preschoolName) {
          const names = Array.isArray(fetchedData.preschoolName)
            ? fetchedData.preschoolName.map((item) => String(item))
            : [];
          setPreschoolsList(names);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [guestToken, setGuestToken]);

  // Synchronizacja dropdownu z react-hook-form
  useEffect(() => {
    setValue("selectedPreschool", selectedPreschool);
  }, [selectedPreschool, setValue]);

  const handleDropdownSelect = (value: string) => {
    setselectedPreschool(value);
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
    setValue("phone", targetValue);
  };

  const onSubmit = async (data: FormInputs) => {
    if (!guestToken) {
      toast.error(TOAST_MESSAGE.NO_TOKEN);
      return;
    }

    const eventData: EventClientType = {
      schoolName: data.selectedPreschool,
      groupName: data.groupName,
      childName: data.name,
      phone: data.phone,
      consentParticipation: data.consentParticipation,
      consentDataProcessing: data.consentDataProcessing,
      subject: `Zapis: ${data.name} - ${data.selectedPreschool}`,
    };

    try {
      await toast.promise(
        sendEventRegistration(eventData, guestToken),
        {
          loading: "Wysyłanie zgłoszenia...",
          success: "Pomyślnie zapisano uczestnika!",
          error: (err: any) => {
            const backendMessage = err.message || "Wystąpił błąd zapisu.";
            if (
              backendMessage.toLowerCase().includes("already registered") ||
              backendMessage.toLowerCase().includes("już zarejestrowane")
            ) {
              setError("name", {
                type: "manual",
                message: "To dziecko zostało już wcześniej zapisane.",
              });
            }

            return backendMessage;
          },
        },
        {
          success: {
            duration: 5000,
          },
        },
      );

      props.onSuccess();
      setIsSubmitSuccess(true);
      reset();
      setPhoneNumber("");
      setselectedPreschool("");

      // setTimeout(() => {
      //   setIsSubmitSuccess(false);
      //   props.onSuccess();
      // }, 3000);
    } catch (error) {
      console.error("Submit error:", error);
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
          <div className={styles.inputsContainer}>
            {/* Szkoła / Przedszkole */}
            <label className={`${styles.label} ${styles.dropdown}`}>
              <span>Wybierz szkołę / przedszkole</span>
              <DropdownSelect
                title={""}
                options={preschoolsList}
                placeholder={"Wybierz placówkę"}
                getValue={handleDropdownSelect}
              />
              <input
                type="hidden"
                {...register("selectedPreschool", {
                  required: "Wybierz placówkę",
                })}
              />
              {errors.selectedPreschool && (
                <span className={`${styles.error} ${styles.errorDropdown}`}>
                  {errors.selectedPreschool.message}
                </span>
              )}
            </label>

            {/* Grupa */}
            <label className={styles.label}>
              <span>Nazwa grupy</span>
              <input
                type="text"
                placeholder="Np. Grupa 5-latki"
                {...register("groupName", {
                  required: "Nazwa grupy jest wymagana",
                })}
              />
              {errors.groupName && (
                <span className={styles.error}>{errors.groupName.message}</span>
              )}
            </label>

            {/* Dziecko */}
            <label className={styles.label}>
              <span>Imię i nazwisko dziecka</span>
              <input
                type="text"
                placeholder="Jan Kowalski"
                {...register("name", {
                  required: "To pole jest wymagane",
                  pattern: { value: plRegex, message: "Niepoprawne znaki" },
                })}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </label>

            {/* Telefon */}
            <label className={styles.label}>
              <span>Numer telefonu</span>
              <input
                type="tel"
                placeholder="123 123 123"
                value={phoneNumber}
                {...register("phone", {
                  required: "Numer jest wymagany",
                  pattern: {
                    value: /^[0-9]{3} [0-9]{3} [0-9]{3}$/,
                    message: "Format: 123 123 123",
                  },
                })}
                onChange={onChangePhoneNumber}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </label>

            {/* Sekcja zgód */}
            <div className={styles.consentsSection}>
              <div
                className={`${styles.consentRow} ${errors.consentParticipation ? styles.shake : ""}`}
              >
                <div className={styles.checkboxWrapper}>
                  <input
                    id="consentParticipation"
                    type="checkbox"
                    className={`${styles.consentCheckbox} ${errors.consentParticipation ? styles.checkboxError : ""}`}
                    {...register("consentParticipation", {
                      required: "Zgoda na udział jest wymagana",
                    })}
                  />
                </div>
                <div className={styles.consentContent}>
                  <label
                    htmlFor="consentParticipation"
                    className={styles.consentLabel}
                  >
                    Wyrażam zgodę na udział mojego dziecka <b>{userName}</b> w
                    "Tańczące Gwiazdeczki 2026" oraz na wykorzystanie wizerunku
                    w celach promocyjnych.
                  </label>
                  <div className={styles.errorContainer}>
                    {errors.consentParticipation && (
                      <span className={styles.consentError}>
                        {errors.consentParticipation.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${styles.consentRow} ${errors.consentDataProcessing ? styles.shake : ""}`}
              >
                <div className={styles.checkboxWrapper}>
                  <input
                    id="consentDataProcessing"
                    type="checkbox"
                    className={`${styles.consentCheckbox} ${errors.consentDataProcessing ? styles.checkboxError : ""}`}
                    {...register("consentDataProcessing", {
                      required: "Zgoda na przetwarzanie danych jest wymagana",
                    })}
                  />
                </div>
                <div className={styles.consentContent}>
                  <label
                    htmlFor="consentDataProcessing"
                    className={styles.consentLabel}
                  >
                    Wyrażam zgodę na przetwarzanie danych osobowych (RODO)
                    zgodnie z naszą{" "}
                    <a
                      href="https://www.prestige.stargard.pl/docs/polityka_prywatnosci.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.privacyLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      polityką prywatności
                    </a>
                    .
                  </label>
                  <div className={styles.errorContainer}>
                    {errors.consentDataProcessing && (
                      <span className={styles.consentError}>
                        {errors.consentDataProcessing.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSubmitSuccess}
            className={`${styles.button} ${isSubmitSuccess ? styles.success : ""}`}
          >
            {isSubmitting && "Zapisywanie..."}
            {isSubmitSuccess && "Zapisano pomyślnie!"}
            {!isSubmitting && !isSubmitSuccess && "Zapisz dziecko!"}
          </button>
        </form>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default DanceEventForm;
