"use client";

import { useEffect, useRef, useState } from "react";
import { menuItem } from "@/types/headerTypes";
import ArrowIcon from "../icons/ArrowIcon/ArrowIcon";
import { checkIfInMobileView } from "../../utils/clientUtils";
import Link from "next/link";

import styles from "./DropdownNav.module.scss";
import useOutsideClick from "@/hooks/useOutSideClick";

type DropDownNavProps = menuItem & {
  isHamburgerOpen: boolean;
};

const DropDownNav = ({
  title,
  path,
  childrenData,
  isHamburgerOpen,
}: DropDownNavProps) => {
  // const [iconColor, setIconColor] = useState("white" || "black");
  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  let dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleMouseEnter = () => {
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
      key={""}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <div
        className={`${styles.dropdownHeader} ${styles.menuItem}`}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ArrowIcon isPressed={isOpen} />
      </div>

      {childrenData && (
        <div
          id={styles.dropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${styles.dropdownBox}  ${isOpen ? styles.active : ""}`}
        >
          <ul>
            {childrenData.map((item, index) => (
              <li className={styles.item} key={index}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default DropDownNav;
