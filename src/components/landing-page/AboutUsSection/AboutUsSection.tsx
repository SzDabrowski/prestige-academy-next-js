import styles from "./AboutUsSection.module.scss";
import { Container } from "@/components/Container/Container";
import Link from "next/link";

import abouUsData from "../../../data/aboutUs.json";

const AboutUsSection = () => {
  return (
    <div className={styles.shadowBox}>
      <Container>
        <section className={styles.section}>
          <div className={styles.textContent}>
            <span>O nas i</span>
            <h3>O naszej akademii tańca</h3>
            <p>{abouUsData.summary.desc_1}</p>
            <Link href={"/o_nas/"}>Zobacz wiecej...</Link>
            <div className={styles.card}></div>
          </div>
          <div className={styles.flexGroup}>
            <div className={styles.person}>
              <div className={`${styles.avatar} ${styles.greta}`}></div>
              <div className={styles.personText}>
                <span className={styles.name}>Greta</span>
                <span className={styles.info}>{abouUsData.Greta.short}</span>
              </div>
            </div>

            <div className={styles.person}>
              <div className={`${styles.avatar} ${styles.krystian}`}></div>
              <div className={styles.personText}>
                <span className={styles.name}>Krystian</span>
                <span className={styles.info}>{abouUsData.krystian.short}</span>
              </div>
            </div>

            <div className={styles.person}>
              <div className={`${styles.avatar} ${styles.szymon}`}></div>
              <div className={styles.personText}>
                <span className={styles.name}>Szymon</span>
                <span className={styles.info}>{abouUsData.Szymon.short}</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUsSection;
