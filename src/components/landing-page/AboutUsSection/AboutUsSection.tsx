import styles from "./AboutUsSection.module.scss";
import { Container } from "@/components/Container/Container";

const AboutUsSection = () => {
  return (
    <div className={styles.shadowBox}>
      <Container>
        <section className={styles.section}>
          <div className={styles.textContent}>
            <span>O nas i</span>
            <h3>O naszej akademii tańca</h3>
            <p>
              Założycielami Akademii Tańca Prestige, są szeroko utytułowani
              tancerze Krystian i Greta Kisielewscy, którzy specjalizują się w
              tańcach latynoamerykańskich jak i standardowych.
            </p>
            <div className={styles.card}></div>
          </div>
          <div className={styles.flexGroup}>
            <div className={styles.person}>
              <div className={styles.avatar}></div>
              <span className={styles.name}>Greta</span>
              <span className={styles.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </span>
            </div>

            <div className={styles.person}>
              <div className={styles.avatar}></div>
              <span className={styles.name}>Krystian</span>
              <span className={styles.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </span>
            </div>

            <div className={styles.person}>
              <div className={styles.avatar}></div>
              <span className={styles.name}>Szymon</span>
              <span className={styles.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </span>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUsSection;
