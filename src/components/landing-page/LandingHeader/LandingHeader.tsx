"use client";

import Navbar from "@/components/Navbar/Navbar";
import DropDownNav from "@/components/DropdownNav/DropdownNav";
import { Container } from "@/components/Container/Container";
import { menuItem } from "@/types/headerTypes";
import { Fade as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { checkIfInMobileView } from "@/utils/clientUtils";

import styles from "./LandingHeader.module.scss";

const LandingHeader = () => {
  const [isOpenHamb, setOpenHamb] = useState(false);
  const [isScrolling, setisScrolling] = useState(false);

  const handleScroll = () => {
    const isScrollGreaterThanZero = window.scrollY > 0;
    setisScrolling(isScrollGreaterThanZero);
  };

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
      }
    }, 50);
  });

  return (
    <header
      className={`${styles.header} ${
        isScrolling || isOpenHamb ? styles.moving : ``
      }`}
    >
      <Container>
        <div className={styles.headerContainer}>
          <div className={styles.mobileContainer}>
            <a href="#" className={styles.logo}>
              logo
            </a>
            <div className={styles.hamburgerWrapper}>
              <Hamburger
                toggled={isOpenHamb}
                size={40}
                color={isScrolling || isOpenHamb ? "#000" : "#fff"}
                toggle={() => {
                  setOpenHamb(!isOpenHamb);
                }}
              />
            </div>
          </div>
          <Navbar isHamburgerOpen={isOpenHamb} />
        </div>
      </Container>
    </header>
  );
};

export default LandingHeader;
