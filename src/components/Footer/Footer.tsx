import { Container } from "../Container/Container";
import styles from "./Footer.module.scss";

import navbarItems from "../../data/NavbarItems.json";

import Link from "next/link";

import { PrestigeLogoIcon } from "../icons/LogoIcon/PrestigeLogoIcon";
import {
  FacebookIcon,
  InstagramIcon,
  AdressIcon,
  PhoneIcon,
  MailIcon,
} from "../icons/SocialIcons";

import aboutUsData from "../../data/aboutUs.json";

import CompamyInfo from "../../data/companyInfo.json";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.flexGroup}>
          <div className={styles.summary}>
            <Link href="/kontakt/">
              <span className={styles.question}>Masz Pytania?</span>
              <span className={styles.contact}>Napisz do nas!</span>
            </Link>

            <span className={styles.about}>{aboutUsData.summary.desc_2}</span>
          </div>

          <div className="">
            <div className={styles.logo}>
              <PrestigeLogoIcon textfillColor={"#fff"} iconfillColor={"#fff"} />
            </div>
            <div className={styles.flexGroup}>
              <div className={styles.menu}>
                <ul>
                  {navbarItems.map((item, index) => (
                    <li
                      key={index}
                      className={`${styles.item} ${styles.menuItem}`}
                    >
                      <a href={item.path}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.info}>
                <div className={styles.item}>
                  <AdressIcon fillColor="#fff" />
                  <span>{CompamyInfo.contact.adress}</span>
                </div>

                <div className={styles.item}>
                  <a href={`tel:${CompamyInfo.contact.phoneNumber}`}>
                    <PhoneIcon fillColor="#fff" />
                    <span>{CompamyInfo.contact.phoneNumber}</span>
                  </a>
                </div>

                <div className={styles.item}>
                  <a href={`mailto:${CompamyInfo.contact.email}`}>
                    <MailIcon fillColor="#fff" />
                    <span>{CompamyInfo.contact.email}</span>
                  </a>
                </div>

                <span className={styles.item}>
                  <span className={styles.socialIcon}>
                    <a href={CompamyInfo.socialMedia.facebook}>
                      <FacebookIcon fillColor="#fff" />
                    </a>
                    <a href={CompamyInfo.socialMedia.instagram}>
                      <InstagramIcon fillColor="#fff" />
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
