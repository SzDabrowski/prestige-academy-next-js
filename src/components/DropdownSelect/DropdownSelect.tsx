"use client";
import styles from "./DropdownSelect.module.scss";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import { useState } from "react";

export const DropdownSelect = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${styles.selectMenu} ${isActive ? styles.active : ""}`}>
      <div
        className={styles.selectBtn}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <span className={styles.btnText}>Options</span>
        <ArrowIcon isPressed={isActive} />
      </div>

      <ul className={styles.options}>
        <li className={styles.option}>
          <span></span>
        </li>
      </ul>
    </div>
  );
};
