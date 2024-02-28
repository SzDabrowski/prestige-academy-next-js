import { Container } from "../Container/Container";
import styles from "./Footer.module.scss";

import navbarItems from "../../../Data/NavbarItems.json";

const footerItems = {
  aboutUs:
    "Our client list is drawn from the competetive world of stand-up comendy and our boutique, focused company work closely with them to develop talents on the circuit into the skills needed for along-lasting career performing and writing for television.",

  companyInfo: [
    "1794 Rich Oak Avenue Los Angeles",
    "+11 111 111 111",
    "info@gmail.com",
  ],
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.flexGroup}>
          <div className={styles.summary}>
            <span className={styles.question}>Any Question?</span>
            <span className={styles.contact}>Contact Us</span>

            <span className={styles.about}>{footerItems.aboutUs}</span>
          </div>

          <div className={styles.menu}>
            <ul>
              {navbarItems.map((item, index) => (
                <li className={styles.item}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.info}>
            <div className="">LOGO</div>
            {footerItems.companyInfo.map((item) => (
              <span className={styles.item}>{item}</span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
