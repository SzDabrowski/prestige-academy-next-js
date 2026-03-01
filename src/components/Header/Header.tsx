"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Container } from "@/components/Container/Container";
import { Fade as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";

import { PrestigeLogoIcon } from "../icons/LogoIcon/PrestigeLogoIcon";

import styles from "./Header.module.scss";
import NotificationBar from "../NotificationBar/NotificationBar";
import Link from "next/link";

const Header = () => {
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
    <div className={styles.headerContainer}>
      <NotificationBar />
      <header className={`${styles.header} ${isOpenHamb ? styles.moving : ``}`}>
        <Container>
          <div className={styles.headerContainer}>
            <div className={styles.mobileContainer}>
              <Link href="/" className={styles.logo}>
                <PrestigeLogoIcon textfillColor={"black"} />
              </Link>
              <div className={styles.hamburgerWrapper}>
                <Hamburger
                  toggled={isOpenHamb}
                  size={40}
                  color={"#000"}
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
    </div>
  );
};

export default Header;
