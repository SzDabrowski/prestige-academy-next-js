"use client";

import React, { useState } from "react";
import { PromoBanner } from "./promoBanner";
import styles from "./page.module.scss";
import { Star } from "lucide-react";

const Gwiazdeczki = () => {
  return (
    <div className={styles.wrapper}>
      {/* Dekoracyjne tło */}
      <div className={styles.blobPink} />
      <div className={styles.blobBlue} />

      <main className={styles.mainCard}>
        {/* Na mobile to będzie na dole (dzięki flex-direction: column-reverse) */}
        <div className={styles.formSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              TAŃCZĄCE
              <br />
              GWIAZDECZKI!
            </h1>
            <p className={styles.subtitle}>WYSTĘPY TANECZNE DLA DZIECI</p>
            <div className={styles.titleStar}>
              <Star fill="#ffdc5d" stroke="none" className={styles.star1} />
              <Star fill="#ffdc5d" stroke="none" className={styles.star2} />
            </div>
          </div>
          
          <div style={{ textAlign: "center", padding: "3rem 1rem", backgroundColor: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ color: "#ef4444", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
              ZAPISY ZOSTAŁY ZAKOŃCZONE
            </h2>
            <p style={{ color: "#4b5563", fontSize: "1rem" }}>
              Dziękujemy za zainteresowanie wydarzeniem. Limit miejsc został wyczerpany lub termin zapisów minął.
            </p>
          </div>
        </div>

        {/* Na mobile to będzie na górze */}
        <div className={styles.visualSection}>
          <PromoBanner />
        </div>
      </main>
    </div>
  );
};

export default Gwiazdeczki;
