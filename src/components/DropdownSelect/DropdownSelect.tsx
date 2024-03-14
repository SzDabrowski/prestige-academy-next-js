"use client";
import styles from "./DropdownSelect.module.scss";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import { useState } from "react";

export const DropdownSelect = () => {
	const [isActive, setIsActive] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div className={`${styles.selectMenu} ${isActive ? styles.active : ""}`}>
			<span className={styles.btnLabel}>Options</span>
			<div
				className={styles.selectBtn}
				onClick={() => {
					setIsActive(!isActive);
				}}
				onFocus={() => {
					setIsActive(!isActive);
				}}
			>
				{" "}
				{!isSelected ? (
					<span className={styles.placeholder}>Select option</span>
				) : (
					<span className={styles.optionsValue}>Option</span>
				)}
				<ArrowIcon isPressed={isActive} />
			</div>

			<ul className={styles.options}>
				<li
					className={styles.option}
					onClick={() => {
						setIsSelected(true);
					}}
				>
					<span>Opcja 1</span>
				</li>

				<li
					className={styles.option}
					onClick={() => {
						setIsSelected(true);
					}}
				>
					<span>Opcja 2</span>
				</li>

				<li
					className={styles.option}
					onClick={() => {
						setIsSelected(true);
					}}
				>
					<span>Opcja 3</span>
				</li>
			</ul>
		</div>
	);
};
