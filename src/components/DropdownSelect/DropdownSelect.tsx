"use client";
import styles from "./DropdownSelect.module.scss";
import ArrowIcon from "../icons/ArrowIcon/ArrowIcon";
import { useState, useRef, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutSideClick";

interface iDropdownSelect {
  title: string;
  options: string[];
  placeholder: string;
  value?: string;
  getValue: (value: string) => void;
}

export const DropdownSelect = (props: iDropdownSelect) => {
  const [isActive, setIsActive] = useState(false);
  // Jeśli mamy początkową wartość, ustawiamy isSelected na true
  const [isSelected, setIsSelected] = useState(!!props.value);
  const [selectedOption, setSelectedOption] = useState<string>(
    props.value || "",
  );

  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsActive(false));

  const handleSelect = (option: string) => {
    setIsSelected(true);
    setIsActive(false);
    setSelectedOption(option);
    props.getValue(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.selectMenu} ${isActive ? styles.active : ""}`}
    >
      {props.title && <span className={styles.btnLabel}>{props.title}</span>}

      <div className={styles.selectBtn} onClick={() => setIsActive(!isActive)}>
        {isSelected ? (
          <span className={styles.optionsValue}>{selectedOption}</span>
        ) : (
          <span className={styles.placeholder}>{props.placeholder}</span>
        )}
        <ArrowIcon isPressed={isActive} />
      </div>

      <ul className={styles.options}>
        {props.options.map((option, index) => (
          <li
            key={index}
            className={styles.option}
            onClick={() => handleSelect(option)}
          >
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
