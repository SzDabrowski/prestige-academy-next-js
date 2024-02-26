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
      }}
    >
      <div className={`${styles.dropdownHeader} ${styles.menuItem}`}>
        <span>{title}</span>
        <ArrowIcon isPressed={isOpen} />
      </div>

      {children && isOpen && (
        <div id={styles.dropdown} className={styles.wrapper}>
          <ul className={styles.dropdownBox}>
            {children.map((item, index) => (
              <li className={styles.item} key={index}>
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
