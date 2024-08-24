"use client";
import styles from "./DropdownSelect.module.scss";
import ArrowIcon from "../icons/ArrowIcon/ArrowIcon";
import { useState, useRef } from "react";
import useOutsideClick from "@/hooks/useOutSideClick";

interface iDropdownSelect {
  title: string;
  options: string[];
  placeholder: string;
  getValue: (value: string) => string;
}

export const DropdownSelect = (props: iDropdownSelect) => {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const sendValueToParent = (option: string) => {
    const selectedOption = props.getValue(option);
    setSelectedOption(selectedOption);
  };

  let dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => {
    setIsActive(false);
  });

  return (
    <div
      ref={dropdownRef}
      className={`${styles.selectMenu} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.btnLabel}>{props.title}</span>
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
          <span className={styles.placeholder}>{props.placeholder}</span>
        ) : (
          <span className={styles.optionsValue}>{selectedOption}</span>
        )}
        <ArrowIcon isPressed={isActive} />
      </div>

      <ul className={styles.options}>
        {props.options.map((option, index) => {
          return (
            <li
              key={index}
              className={styles.option}
              onClick={() => {
                setIsSelected(true);
                setIsActive(false);
                sendValueToParent(option);
              }}
            >
              <span>{option}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
