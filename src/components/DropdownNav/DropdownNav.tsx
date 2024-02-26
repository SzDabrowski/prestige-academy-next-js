"use client";

import { useState } from "react";
import { menuItem } from "@/types/headerTypes";

import styles from "./DropdownNav.module.scss";

type DropDownNavProps = menuItem;

const DropDownNav = ({ title, path, children }: DropDownNavProps) => {
  return (
    <div className={styles.dropdownBox}>
      <ul>
        <li className={styles.listItem}>
          <a href={path}>{title}</a>
        </li>
      </ul>
    </div>
  );
};

export default DropDownNav;
