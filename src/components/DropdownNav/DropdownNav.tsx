"use client";

import { useEffect, useState } from "react";
import { menuItem } from "@/types/headerTypes";
import ArrowIcon from "../ArrowIcon/ArrowIcon";

import styles from "./DropdownNav.module.scss";

type DropDownNavProps = menuItem;

const DropDownNav = ({ title, path, children }: DropDownNavProps) => {
	const [iconColor, setIconColor] = useState("white" || "black");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<li
			className={styles.wrapper}
			onClick={() => {
				setIsOpen(!isOpen);
				console.log(isOpen);
			}}
		>
			<div className={`${styles.dropdownHeader} ${styles.menuItem}`}>
				<span>{title}</span>
				<ArrowIcon isPressed={isOpen} />
			</div>

			{/* <div className={styles.dropdownBox}>
				<ul>
					<li className={styles.listItem}>
						<a href={path}>{title}</a>
					</li>
				</ul>
			</div> */}
		</li>
	);
};

export default DropDownNav;
