"use client";
import styles from "./AboutUs.module.scss";
import { Container } from "@/components/Container/Container";
import aboutUsData from "@/data/aboutUs.json";
import { useState } from "react";

import ArrowIcon from "@/components/icons/ArrowIcon/ArrowIcon";

interface InfoClickedState {
  greta: boolean;
  krystian: boolean;
  szymon: boolean;
}

const AboutUs = () => {
  const [infoClicked, setInfoClicked] = useState<InfoClickedState>({
    greta: false,
    krystian: false,
    szymon: false,
  });

  const handleInfoClick = (person: keyof InfoClickedState) => {
    setInfoClicked((prevState) => ({
      ...prevState,
      [person]: !prevState[person],
    }));
  };

  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.textContent}>
          <span>O nas i</span>
          <h3>O naszej akademii tańca</h3>
          <p>{aboutUsData.summary.desc_1}</p>
          <p>{aboutUsData.summary.desc_2}</p>
          <div className={styles.quote}>
            <p>{aboutUsData.summary.quote}</p>
            <p className={styles.signed}>{aboutUsData.summary.quote_sign}</p>
          </div>
          <div className={styles.card}></div>
        </div>
        <div className={styles.flexGroup}>
          <div className={styles.person}>
            <div className={`${styles.avatar} ${styles.krystian}`}></div>
            <div className={styles.personText}>
              <span className={styles.name}>Krystian</span>
              <div className={styles.infoWrapper}>
                <div className={styles.info}>
                  <span
                    className={`${styles.infoText} ${
                      infoClicked.krystian ? "" : styles.infoClosed
                    }`}
                  >
                    {aboutUsData.krystian.desc}
                  </span>
                  <div
                    className={styles.infoButton}
                    onClick={() => handleInfoClick("krystian")}
                  >
                    <ArrowIcon isPressed={infoClicked.krystian} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.person}>
            <div className={`${styles.avatar} ${styles.greta}`}></div>
            <div className={styles.personText}>
              <span className={styles.name}>Greta</span>
              <div className={styles.infoWrapper}>
                <div className={styles.info}>
                  <span
                    className={`${styles.infoText} ${
                      infoClicked.greta ? "" : styles.infoClosed
                    }`}
                  >
                    {aboutUsData.Greta.desc}
                  </span>
                  <div
                    className={styles.infoButton}
                    onClick={() => handleInfoClick("greta")}
                  >
                    <ArrowIcon isPressed={infoClicked.greta} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.person}>
            <div className={`${styles.avatar} ${styles.szymon}`}></div>
            <div className={styles.personText}>
              <span className={styles.name}>Szymon</span>
              <div className={styles.infoWrapper}>
                <div className={styles.info}>
                  <span
                    className={`${styles.infoText} ${
                      infoClicked.szymon ? "" : styles.infoClosed
                    }`}
                  >
                    {aboutUsData.Szymon.desc}
                  </span>
                  <div
                    className={styles.infoButton}
                    onClick={() => handleInfoClick("szymon")}
                  >
                    <ArrowIcon isPressed={infoClicked.szymon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutUs;
