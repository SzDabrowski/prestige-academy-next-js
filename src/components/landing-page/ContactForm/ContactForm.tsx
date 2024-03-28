"use client";
import React, { useState } from "react";

import { Container } from "@/components/Container/Container";
import { DropdownSelect } from "@/components/DropdownSelect/DropdownSelect";

import danceCourses from "@/data/danceCourses.json";

import styles from "./ContactFrom.module.scss";

const ContactForm = () => {
	const [selectedDanceCourse, setselectedDanceCourse] = useState("");

	const handleDropdownSelect = (value: string) => {
		setselectedDanceCourse(value);
	};

	const courseTitles = danceCourses.map((course) => course.title);

	return (
		<Container>
			<div className={styles.wrapper}>
				<div className={styles.formContainer}>
					<form
						className={styles.form}
						action="https://api.web3forms.com/submit"
						method="POST"
					>
						<input
							type="hidden"
							name="access_key"
							value="7369090a-7acb-46e8-b84d-69101f7fe01a"
						/>

						<DropdownSelect
							title={"Kursy tańca"}
							options={courseTitles}
							placeholder={"Wybierz kurs"}
							getValue={handleDropdownSelect}
						/>

						<label className={styles.label}>
							<span>Twoje nazwisko</span>
							<input
								type="text"
								name="name"
								placeholder="Jan Kowalski"
								required
							/>
						</label>

						<label className={styles.label}>
							<span>Adres email</span>
							<input
								type="email"
								name="email"
								placeholder="Twój adres email"
								required
							/>
						</label>

						<label className={styles.label}>
							<span>Adres email</span>
							<input
								type="number"
								name="phone"
								placeholder="Numer telefonu"
								required
							/>
						</label>

						<div
							className="h-captcha"
							data-captcha="true"
						></div>
						<button
							className={styles.button}
							type="submit"
						>
							Zapisz się!
						</button>
					</form>
				</div>
			</div>
		</Container>
	);
};

export default ContactForm;
