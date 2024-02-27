"use client";

import { useEffect, useState } from "react";
import { menuItem } from "@/types/headerTypes";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import { checkIfInMobileView } from "@/utils/clientUtils";

import styles from "./DropdownNav.module.scss";

type DropDownNavProps = menuItem & {
	isHamburgerOpen: boolean;
};

const DropDownNav = ({
	title,
	path,
	children,
	isHamburgerOpen,
}: DropDownNavProps) => {
	const [iconColor, setIconColor] = useState("white" || "black");
	const [isOpen, setIsOpen] = useState(false);

	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleMouseEnter = () => {
		console.log(checkIfInMobileView());
		if (!checkIfInMobileView()) {
			setIsOpen(true);
		}
	};

	const handleMouseLeave = () => {
		if (!checkIfInMobileView()) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		// Close the dropdown when the hamburger is closed
		if (checkIfInMobileView() && isHamburgerOpen == false) {
			setIsOpen(false);
		}
	}, [isHamburgerOpen]);

	return (
		<li
			onClick={() => {
				setIsOpen(!isOpen);
			}}
			className={styles.wrapper}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className={`${styles.dropdownHeader} ${styles.menuItem}`}>
				<span>{title}</span>
				<ArrowIcon isPressed={isOpen} />
			</div>

			{children && (
				<div
					id={styles.dropdown}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={`${styles.dropdownBox}  ${isOpen ? styles.active : ""}`}
				>
					<ul>
						{children.map((item, index) => (
							<li
								className={styles.item}
								key={index}
							>
								<a href={item.path}>{item.title}</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</li>
	);
};

export default DropDownNav;