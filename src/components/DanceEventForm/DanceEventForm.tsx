"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, useWatch } from "react-hook-form";
import { phoneNumberAutoFormat, plRegex } from "../../utils/formUtils";
import styles from "./DanceEventForm.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import LoadingLogo from "../LoadingLogo/LoadingLogo";

import {
  fetchServerToken,
  sendEventRegistration,
} from "@/app/actions/serverDB";
import { fetchEventSchoolist } from "@/lib/contentful/serverActions/coursesGroups";
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

  // Dane z JSON: { "Nazwa": ["Gr1", "Gr2"] }
  const [allSchools, setAllSchools] = useState<Record<string, string[]>>({});
  const [selectedPreschool, setSelectedPreschool] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: {
      selectedPreschool: "",
      groupName: "",
      consentParticipation: false,
      consentDataProcessing: false,
    },
  });

  const userName = useWatch({ control, name: "name", defaultValue: "..." });

  useEffect(() => {
    const initData = async () => {
      try {
        if (!guestToken) {
          const token = await fetchServerToken();
          setGuestToken(token);
        }

        const fetchedData = await fetchEventSchoolist({ preview: false });
        if (fetchedData?.list) {
          setAllSchools(fetchedData.list);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [guestToken, setGuestToken]);

  const handlePreschoolChange = (value: string) => {
    setSelectedPreschool(value);
    setValue("selectedPreschool", value, { shouldValidate: true });

    const groups = allSchools[value] || [];
    if (groups.length > 0) {
      setSelectedGroup("");
      setValue("groupName", "", { shouldValidate: false });
    } else {
      setSelectedGroup("Brak grupy");
      setValue("groupName", "Brak grupy", { shouldValidate: true });
    }
    return value;
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    setValue("groupName", value, { shouldValidate: true });
    return value;
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
      await toast.promise(sendEventRegistration(eventData, guestToken), {
        loading: "Wysyłanie zgłoszenia...",
        success: "Pomyślnie zapisano uczestnika!",
        error: (err: any) => err.message || "Błąd zapisu.",
      });

      props.onSuccess();
      setIsSubmitSuccess(true);
      reset();
      setPhoneNumber("");
      setSelectedPreschool("");
      setSelectedGroup("");
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
            <label className={`${styles.label} ${styles.dropdown}`}>
              <span>Wybierz szkołę / przedszkole</span>
              <DropdownSelect
                title={""}
                options={Object.keys(allSchools)}
                placeholder={"Wybierz placówkę"}
                getValue={handlePreschoolChange}
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

            <label
              className={`${styles.label} ${styles.dropdown} ${
                selectedPreschool ? "" : styles.hidden
              }`}
            >
              <span>Nazwa grupy:</span>
              {selectedPreschool &&
              allSchools[selectedPreschool]?.length > 0 ? (
                <>
                  <DropdownSelect
                    key={`group-select-${selectedPreschool}`}
                    title={""}
                    options={allSchools[selectedPreschool]}
                    placeholder={"Wybierz grupę z listy"}
                    getValue={handleGroupChange}
                  />
                  <input
                    type="hidden"
                    {...register("groupName", {
                      required: "Wybierz nazwę grupy",
                    })}
                  />
                </>
              ) : (
                <input
                  type="text"
                  readOnly
                  tabIndex={-1}
                  className={`${styles.input} ${styles.readOnlyInput}`}
                  {...register("groupName", {
                    required: selectedPreschool ? false : "Wybierz placówkę",
                  })}
                  value={selectedPreschool ? "Brak dostępnych grup" : ""}
                />
              )}
              {errors.groupName && (
                <span className={`${styles.error} ${styles.errorDropdown2}`}>
                  {errors.groupName.message}
                </span>
              )}
            </label>

            {/* IMIĘ I NAZWISKO */}
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

            {/* TELEFON */}
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
                onChange={(e) => {
                  const val = phoneNumberAutoFormat(e.target.value);
                  setPhoneNumber(val);
                  setValue("phone", val, { shouldValidate: true });
                }}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </label>

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
            {isSubmitting
              ? "Wysyłanie..."
              : isSubmitSuccess
                ? "Zapisano!"
                : "Zapisz dziecko!"}
          </button>
        </form>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default DanceEventForm;
