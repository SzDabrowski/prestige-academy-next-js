"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, SubmitHandler } from "react-hook-form";

import { checkIfCourseForPairs } from "@/utils/clientUtils";
import { phoneNumberAutoFormat } from "@/utils/formUtils";

import danceCourses from "@/data/danceCourses.json";

import styles from "./CourseForm.module.scss";

interface FormInputs {
  selectedDanceCourse: string;
  name: string;
  pairName?: string;
  email: string;
  phone: string;
}

interface iCourseForm {
  selectedDanceCourse?: string;
}

const CourseForm = (props: iCourseForm) => {
  const [selectedDanceCourse, setselectedDanceCourse] = useState(
    props.selectedDanceCourse ? props.selectedDanceCourse : ""
  );
  const [showDancePartnerInput, setShowDancePartnerInput] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleDropdownSelect = (value: string) => {
    setselectedDanceCourse(value);
    return value;
  };

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value);
    setPhoneNumber(targetValue);
  };

  useEffect(() => {
    setValue("selectedDanceCourse", selectedDanceCourse);

    setShowDancePartnerInput(
      checkIfCourseForPairs(danceCourses, selectedDanceCourse)
    );
  }, [selectedDanceCourse]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const courseTitles = danceCourses.map((course) => course.title);

  const onSubmit = (data: FormInputs, event?: any) => {
    event?.preventDefault();
    console.log(data);
    // Submit your form data here
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.inputsContainer}>
            {/* <input
              type="hidden"
              name="access_key"
              value="7369090a-7acb-46e8-b84d-69101f7fe01a"
            /> */}

            <label
              className={`${styles.label} ${
                props.selectedDanceCourse ? styles.hiddenLabel : ""
              }`}
            >
              <DropdownSelect
                title={"Kurs tańca"}
                options={courseTitles}
                placeholder={"Wybierz kurs"}
                getValue={handleDropdownSelect}
              />

              <input
                type="hidden"
                {...register("selectedDanceCourse", {
                  required: "To pole jest wymagane",
                })}
                value={selectedDanceCourse}
              />

              {errors.name && selectedDanceCourse == "" && (
                <span className={styles.error}>
                  {errors.selectedDanceCourse?.message}
                </span>
              )}
            </label>

            <label className={styles.label}>
              <span>Imię i nazwisko</span>
              <input
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

            <label
              className={`${styles.label} ${
                showDancePartnerInput ? "" : styles.hidden
              }`}
            >
              <span>Partner:</span>
              <input
                id="pairName"
                type={showDancePartnerInput ? "text" : "hidden"}
                {...(showDancePartnerInput
                  ? {
                      ...register("pairName", {
                        ...(showDancePartnerInput && {
                          required: "To pole jest wymagane",
                          minLength: {
                            value: 3,
                            message:
                              "Imię i nazwisko musi mieć co najmniej 3 znaki",
                          },
                        }),
                      }),
                    }
                  : "")}
                placeholder="Anna Kowalska"
              />
              {errors.name && (
                <span className={styles.error}>{errors.pairName?.message}</span>
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
              <span>Numer telefonu</span>
              <input
                id="tel"
                type="tel"
                {...register("phone", {
                  required: "To pole jest wymagane",
                  pattern: {
                    value: /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/,
                    message:
                      "Wprowadź poprawny numer telefonu (np. 123 123 123)",
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

          <input className={styles.button} type="submit" value="Zapisz się!" />
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
