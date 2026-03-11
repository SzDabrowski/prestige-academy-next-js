"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";

import { phoneNumberAutoFormat } from "../../utils/formUtils";

import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";

import { fetchEventSchoolist } from "@/lib/contentful/serverActions/coursesGroups";

import { saveClientData } from "@/app/actions/serverDB";

import { useTokenStore } from "@/app/hooks/useTokenStore";
import { sendNotificationEmail } from "@/app/actions/sendNotification";

import styles from "./PreschoolsForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyReCaptcha } from "@/utils/recaptchaUtils";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { PreschoolClientType } from "@/types/mongodbTypes";
import { fetchServerToken } from "@/app/actions/serverDB";
import { plRegex } from "../../utils/formUtils";

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

  const handleDropdownSelect = (value: string) => {
    setSelectedPreschool(value);
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
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

    if (!guestToken || !isTokenValid()) {
      fetchToken();
    }
  }, [guestToken, setGuestToken, isTokenValid]);

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

  useEffect(() => {
    setValue("selectedPreschool", selectedPreschool);
  }, [selectedPreschool, setValue]);

  useEffect(() => {
    setValue(
      "subject",
      `${userName} zapisał/a się na zajęcia w przedszkolu - ${selectedPreschool}`,
    );
  }, [userName, selectedPreschool, setValue]);

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

  const onSubmit = async (data: FormInputs, event?: any) => {
    event?.preventDefault();

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
    } catch (error) {
      setIsSuccess(false);
      setIsError(true);
      setMessage("Błąd zapisu. Spróbuj ponownie.");
      console.error("Error submitting form:", error);
      throw error;
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
            {selectedPreschool && allSchools[selectedPreschool]?.length > 0 ? (
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
                  {...register("group_name", {
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
                {...register("group_name", {
                  required: selectedPreschool ? false : "Wybierz placówkę",
                })}
                value={selectedPreschool ? "Brak dostępnych grup" : ""}
              />
            )}
            {errors.group_name && (
              <span className={`${styles.error} ${styles.errorDropdown2}`}>
                {errors.group_name.message}
              </span>
            )}
          </label>

          <label className={styles.label}>
            <span>Imię i nazwisko dziecka</span>
            <input
              id="child_name"
              type="text"
              {...register("child_name", {
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
                pattern: {
                  value: plRegex,
                  message: "Usuń cyfry i znaki specjalne",
                },
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

        {/* <input
					className={styles.button}
					type="submit"
					value=
					// disabled={!capVal}
				/> */}

        <button
          className={`${styles.button} ${isSuccess ? styles.success : ""} ${isError ? styles.errorButton : ""}  `}
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting
            ? "Ładowanie..."
            : isSubmitSuccessful && isSuccess
              ? "Wysłano zgłoszenie!"
              : isError
                ? " Nie udało się wysłać zgłoszenia "
                : "Wyślij zgłoszenie!"}
        </button>
        {isError ? (
          <span className={styles.errorSendingMessage}>
            Spróbuj ponownie pózniej lub odśwież stronę
          </span>
        ) : (
          ""
        )}
      </form>
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
