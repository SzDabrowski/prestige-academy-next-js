"use client";
import React, { useEffect, useState } from "react";

import { Container } from "@/components/Container/Container";
import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, SubmitHandler } from "react-hook-form";

import { checkIfCourseForPairs } from "@/utils/clientUtils";

import danceCourses from "@/data/danceCourses.json";

import styles from "./ContactFrom.module.scss";

interface FormInputs {
  selectedDanceCourse: string;
  name: string;
  pairName?: string;
  email: string;
  phone: string;
}

const ContactForm = () => {
  const [selectedDanceCourse, setselectedDanceCourse] = useState("");
  const [showDancePartnerInput, setShowDancePartnerInput] = useState(false);

  const handleDropdownSelect = (value: string) => {
    setselectedDanceCourse(value);
    return value;
  };

  useEffect(() => {
    console.log("selected use effect: " + selectedDanceCourse);

    //set value of  hook-form field
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

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    // Submit your form data here
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputsContainer}>
              {/* <input
              type="hidden"
              name="access_key"
              value="7369090a-7acb-46e8-b84d-69101f7fe01a"
            /> */}

              <DropdownSelect
                title={"Kurs tańca"}
                options={courseTitles}
                placeholder={"Wybierz kurs"}
                getValue={handleDropdownSelect}
              />
              <input
                type="hidden"
                {...register("selectedDanceCourse")}
                placeholder={selectedDanceCourse}
              />

              <label className={styles.label}>
                <span>Imię i nazwisko</span>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Jan Kowalski"
                />
                {errors.name && <span>This field is required</span>}
              </label>

              <label
                className={`${styles.label} ${
                  showDancePartnerInput ? "" : styles.hidden
                }`}
              >
                <span>Partner:</span>
                <input
                  type={showDancePartnerInput ? "text" : "hidden"}
                  {...register("pairName", { required: true })}
                  placeholder="Anna Kowalska"
                />
                {errors.name && <span>This field is required</span>}
              </label>

              <label className={styles.label}>
                <span>Adres email</span>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Twój adres email"
                />
                {errors.email && <span>This field is required</span>}
              </label>

              <label className={styles.label}>
                <span>Numer telefonu</span>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Numer telefonu"
                />
                {errors.phone && <span>This field is required</span>}
              </label>
            </div>

            <div className="h-captcha" data-captcha="true"></div>
            <button className={styles.button} type="submit">
              Zapisz się!
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactForm;
