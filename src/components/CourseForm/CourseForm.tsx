"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form";

import { checkIfCourseForPairs } from "../../utils/clientUtils";
import { phoneNumberAutoFormat } from "../../utils/formUtils";
import { verifyReCaptcha } from "../../utils/recaptchaUtils";

import danceCourses from "@/data/danceCourses.json";

import styles from "./CourseForm.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

import toast, { Toaster } from "react-hot-toast";
import { TOAST_MESSAGE } from "@/lib/toastMessages";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { saveClient } from "@/utils/prismaUtils";

import LoadingLogo from "../LoadingLogo/LoadingLogo";

import { saveClientData } from "@/app/actions/serverDB";

import { useTokenStore } from "@/app/hooks/useTokenStore";
import { sendNotificationEmail } from "@/app/actions/sendNotification";

import { CourseClientType } from "@/types/mongodbTypes";
import { fetchServerToken } from "@/app/actions/serverDB";
import { fetchDanceCoursesData } from "@/lib/contentful/serverActions/danceGroups";
import { DanceCourseListItem } from "@/types/courseTypes";

import { plRegex } from "../../utils/formUtils";

interface FormInputs {
	selectedDanceCourse: string;
	name: string;
	pairName: string;
	email: string;
	phone: string;
	subject: string;
	access_key: string;
}

interface iCourseForm {
	selectedDanceCourse?: string;
}

const CourseForm = (props: iCourseForm) => {
	const { guestToken, setGuestToken } = useTokenStore();

	const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
	const [tokenLoading, setTokenLoading] = useState<boolean>(true);

	const [danceCoursesList, setDanceCoursesList] = useState<
		DanceCourseListItem[]
	>([]);

	const [selectedDanceCourse, setselectedDanceCourse] = useState(
		props.selectedDanceCourse ? props.selectedDanceCourse : ""
	);
	const [showDancePartnerInput, setShowDancePartnerInput] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState<string>("");

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
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
	});

	const userName = useWatch({
		control,
		name: "name",
		defaultValue: "Someone",
	});

	const handleDropdownSelect = (value: string) => {
		setselectedDanceCourse(value);
		return value;
	};

	const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		const targetValue = phoneNumberAutoFormat(e.target.value);
		setPhoneNumber(targetValue);
	};

	useEffect(() => {
		const getData = async () => {
			setCoursesLoading(true);
			try {
				const fetchedDataAdults = await fetchDanceCoursesData({
					targetGroup: "dorosli",
					preview: false,
				});
				const fetchedDataChildren = await fetchDanceCoursesData({
					targetGroup: "dzieci",
					preview: false,
				});

				const adultCourses: DanceCourseListItem[] =
					fetchedDataAdults?.items?.map((item, index) => ({
						id: index,
						title: item.fields.title,
						pairClass: item.fields.pairClass || false,
						group: item.fields.targetGroup || "dorosli",
					})) || [];

				const childrenCourses: DanceCourseListItem[] =
					fetchedDataChildren?.items?.map((item, index) => ({
						id: index,
						title: item.fields.title,
						pairClass: item.fields.pairClass || false,
						group: item.fields.targetGroup || "dzieci",
					})) || [];

				// Merge into one array
				const allCourses = [...adultCourses, ...childrenCourses];
				setDanceCoursesList(allCourses);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setCoursesLoading(false);
			}
		};

		// Only fetch if params are available

		getData();
	}, []);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const token = await fetchServerToken();
				setGuestToken(token);
			} catch (error) {
				console.error("Error fetching token:", error);
			} finally {
				setTokenLoading(false);
			}
		};

		if (guestToken === null) {
			fetchToken();
		} else {
			setTokenLoading(false);
		}
	}, []); // Remove dependencies to prevent infinite loop

	useEffect(() => {
		setValue("selectedDanceCourse", selectedDanceCourse);

		const selectedCourse = danceCoursesList.find(
			(course) => course.title === selectedDanceCourse
		);

		setShowDancePartnerInput(selectedCourse?.pairClass || false);
	}, [selectedDanceCourse, danceCoursesList, setValue]);

	useEffect(() => {
		setValue("subject", `${userName} zapisała/ł się na kurs tańca`);
	}, [userName, setValue]);

	const onSubmit = async (data: FormInputs, event?: any) => {
		event?.preventDefault();

		if (!guestToken) {
			toast.error(TOAST_MESSAGE.NO_TOKEN);
			return;
		}

		const clientData: CourseClientType = {
			courseName: data.selectedDanceCourse,
			pairName: showDancePartnerInput ? data.pairName || "" : "",
			name: data.name,
			email: data.email,
			phone: data.phone,
		};

		try {
			await toast.promise(
				saveClientData(guestToken, clientData), // Use server action
				{
					loading: "Zapisywanie...",
					success: "Zapisano pomyślnie!",
					error: "Błąd podczas zapisu",
				}
			);
			await sendNotificationEmail(guestToken, clientData);

			setIsSuccess(true);
			setMessage("Dane zapisane!");
			reset();
			setPhoneNumber("");
			setselectedDanceCourse("");
		} catch (error) {
			setIsSuccess(false);
			setIsError(true);
			setMessage("Błąd zapisu. Spróbuj ponownie.");
			console.error("Error submitting form:", error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.formContainer}>
				{coursesLoading || tokenLoading ? (
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
						<input
							type="hidden"
							{...register("subject")}
						/>

						<div className={styles.inputsContainer}>
							<label className={`${styles.label} ${styles.DropdownSelect}`}>
								<DropdownSelect
									title={"Kurs tańca"}
									options={danceCoursesList.map((course) => course.title)}
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

								{errors.selectedDanceCourse && selectedDanceCourse === "" && (
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
									type="text"
									{...register("pairName", {
										...(showDancePartnerInput && {
											required: "To pole jest wymagane",
											pattern: {
												value: plRegex,
												message: "Usuń cyfry i znaki specjalne",
											},
											minLength: {
												value: 3,
												message:
													"Imię i nazwisko musi mieć co najmniej 3 znaki",
											},
										}),
									})}
									placeholder="Anna Kowalska"
									disabled={!showDancePartnerInput}
								/>
								{errors.pairName && (
									<span className={styles.error}>
										{errors.pairName?.message}
									</span>
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
								<Controller
									name="phone"
									control={control}
									rules={{
										required: "To pole jest wymagane",
										pattern: {
											value: /^[0-9]{3} [0-9]{3} [0-9]{3}$/,
											message:
												"Wprowadź poprawny numer telefonu (np. 123 123 123)",
										},
									}}
									render={({ field }) => (
										<input
											id="tel"
											type="tel"
											placeholder="Numer telefonu"
											value={phoneNumber}
											onChange={(e) => {
												const formatted = phoneNumberAutoFormat(e.target.value);
												setPhoneNumber(formatted);
												field.onChange(formatted);
											}}
											onBlur={field.onBlur}
										/>
									)}
								/>
								{errors.phone && (
									<span className={styles.error}>{errors.phone.message}</span>
								)}
							</label>
						</div>

						{/* <div className={styles.capWrapper}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTHCA_KEY || ""}
              onChange={(val) => {
                setCapVal;
              }}
            />
          </div> */}

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
							<div
								role="alert"
								aria-live="polite"
								className={styles.errorSendingMessage}
							>
								Spróbuj ponownie później lub odśwież stronę
							</div>
						) : (
							""
						)}
					</form>
				)}
				<Toaster
					position="top-center"
					containerStyle={{
						top: 200,
					}}
				/>
			</div>
		</div>
	);
};

export default CourseForm;
