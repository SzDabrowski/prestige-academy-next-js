import { arrowIconTypes } from "@/types/arrowIconTypes";
import { useState } from "react";

import styles from "./ArrowIcon.module.scss";

const ArrowIcon = ({ isPressed }: arrowIconTypes) => {
	return (
		<div className={styles.wrapper}>
			<svg
				className={`${styles.icon} ${isPressed ? styles.pressed : ""}`}
				width="14"
				height="8"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke="white"
					strokeWidth="1.5"
					fill="none"
					d="m1 1 4 4 4-4"
				/>
			</svg>
		</div>
	);
};

export default ArrowIcon;
