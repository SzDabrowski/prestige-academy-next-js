"use client";

import React, { useState } from "react";
import DanceEventForm from "@/components/DanceEventForm/DanceEventForm";
import { PromoBanner } from "./promoBanner";
import { Toast } from "./toast";
import styles from "./page.module.scss";
import { Star } from "lucide-react";

const Gwiazdeczki = () => {
  const [isSuccess, setIsSuccess] = useState(false);

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
          <DanceEventForm onSuccess={() => setIsSuccess(true)} />
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
