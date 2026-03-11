"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { phoneNumberAutoFormat, plRegex } from "../../utils/formUtils";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import { fetchEventSchoolist } from "@/lib/contentful/serverActions/coursesGroups";
import { saveClientData, fetchServerToken } from "@/app/actions/serverDB";
import { useTokenStore } from "@/app/hooks/useTokenStore";
import { sendNotificationEmail } from "@/app/actions/sendNotification";
import { PreschoolClientType } from "@/types/mongodbTypes";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import styles from "./PreschoolsForm.module.scss";

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
  const { guestToken, setGuestToken, isTokenValid } = useTokenStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [allSchools, setAllSchools] = useState<Record<string, string[]>>({});
  const [selectedPreschool, setSelectedPreschool] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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
      child_name: "",
      group_name: "",
      selectedPreschool: "",
    },
  });

  // Obserwujemy imię dziecka, aby aktualizować temat wiadomości
  const childName = useWatch({
    control,
    name: "child_name",
  });

  // Aktualizacja tematu, gdy zmienia się imię dziecka lub przedszkole
  useEffect(() => {
    const name = childName || "Ktoś";
    const school = selectedPreschool || "nie wybrano placówki";
    setValue(
      "subject",
      `${name} zapisał/a się na zajęcia w przedszkolu - ${school}`,
    );
  }, [childName, selectedPreschool, setValue]);

  // Pobieranie tokena i listy szkół
  useEffect(() => {
    const initData = async () => {
      try {
        let currentToken = guestToken;
        if (!guestToken || !isTokenValid()) {
          currentToken = await fetchServerToken();
          setGuestToken(currentToken);
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
  }, [guestToken, setGuestToken, isTokenValid]);

  // --- Poprawione metody obsługi zmian ---

  const handlePreschoolChange = (value: string) => {
    setSelectedPreschool(value);
    setValue("selectedPreschool", value, { shouldValidate: true });

    const groups = allSchools[value] || [];
    if (groups.length > 0) {
      setSelectedGroup("");
      setValue("group_name", "", { shouldValidate: false });
    } else {
      setSelectedGroup("Brak grupy");
      setValue("group_name", "Brak grupy", { shouldValidate: true });
    }
    return value;
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    setValue("group_name", value, { shouldValidate: true });
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(formatted);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormInputs) => {
    if (!guestToken) {
      toast.error(TOAST_MESSAGE.NO_TOKEN);
      return;
    }

    const preschoolClientData: PreschoolClientType = {
      preschoolName: data.selectedPreschool,
      studentName: data.child_name,
      parentName: data.parent_name,
      email: data.email,
      phone: data.phone,
      groupName: data.group_name || "",
    };

    try {
      await toast.promise(
        saveClientData(guestToken, undefined, preschoolClientData),
        {
          loading: "Zapisywanie...",
          success: "Zapisano pomyślnie!",
          error: "Błąd podczas zapisu",
        },
      );

      await sendNotificationEmail(guestToken, undefined, preschoolClientData);

      setIsSuccess(true);
      setIsError(false);
      setMessage("Dane zapisane!");
      reset();
      setPhoneNumber("");
      setSelectedPreschool("");
      setSelectedGroup("");
    } catch (error) {
      setIsSuccess(false);
      setIsError(true);
      setMessage("Błąd zapisu. Spróbuj ponownie.");
      console.error("Error submitting form:", error);
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
          {/* Wybór przedszkola */}
          <label className={`${styles.label} ${styles.dropdown}`}>
            <span>Wybierz szkołę / przedszkole</span>
            <DropdownSelect
              options={Object.keys(allSchools)}
              placeholder={"Wybierz placówkę"}
              getValue={handlePreschoolChange}
              title=""
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

          {/* Wybór grupy */}
          <label
            className={`${styles.label} ${styles.dropdown} ${selectedPreschool ? "" : styles.hidden}`}
          >
            <span>Nazwa grupy:</span>
            {selectedPreschool && allSchools[selectedPreschool]?.length > 0 ? (
              <>
                <DropdownSelect
                  key={`group-select-${selectedPreschool}`}
                  options={allSchools[selectedPreschool]}
                  placeholder={"Wybierz grupę z listy"}
                  getValue={handleGroupChange}
                  title=""
                />
                <input
                  type="hidden"
                  {...register("group_name", {
                    required: "Wybierz nazwę grupy",
                  })}
                />
              </>
            ) : (
              <input
                type="text"
                readOnly
                className={`${styles.input} ${styles.readOnlyInput}`}
                value={selectedPreschool ? "Brak dostępnych grup" : ""}
                {...register("group_name")}
              />
            )}
            {errors.group_name && (
              <span className={`${styles.error} ${styles.errorDropdown2}`}>
                {errors.group_name.message}
              </span>
            )}
          </label>

          {/* Dane dziecka */}
          <label className={styles.label}>
            <span>Imię i nazwisko dziecka</span>
            <input
              type="text"
              placeholder="Jaś Kowalski"
              {...register("child_name", {
                required: "To pole jest wymagane",
                pattern: {
                  value: plRegex,
                  message: "Usuń cyfry i znaki specjalne",
                },
                minLength: { value: 3, message: "Minimum 3 znaki" },
              })}
            />
            {errors.child_name && (
              <span className={styles.error}>{errors.child_name.message}</span>
            )}
          </label>

          {/* Dane rodzica */}
          <label className={styles.label}>
            <span>Imię i nazwisko rodzica</span>
            <input
              type="text"
              placeholder="Jan Kowalski"
              {...register("parent_name", {
                required: "To pole jest wymagane",
                pattern: {
                  value: plRegex,
                  message: "Usuń cyfry i znaki specjalne",
                },
                minLength: { value: 3, message: "Minimum 3 znaki" },
              })}
            />
            {errors.parent_name && (
              <span className={styles.error}>{errors.parent_name.message}</span>
            )}
          </label>

          {/* Email */}
          <label className={styles.label}>
            <span>Adres email</span>
            <input
              type="email"
              placeholder="Twój adres email"
              {...register("email", {
                required: "To pole jest wymagane",
                pattern: {
                  value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Wprowadź poprawny adres email",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
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
                required: "To pole jest wymagane",
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
        </div>

        <button
          className={`${styles.button} ${isSuccess ? styles.success : ""} ${isError ? styles.errorButton : ""}`}
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting
            ? "Ładowanie..."
            : isSuccess
              ? "Wysłano zgłoszenie!"
              : "Wyślij zgłoszenie!"}
        </button>

        {isError && (
          <span className={styles.errorSendingMessage}>
            Spróbuj ponownie później.
          </span>
        )}
      </form>
      <Toaster position="top-center" containerStyle={{ top: 200 }} />
    </div>
  );
};

export default PreschoolsForm;
