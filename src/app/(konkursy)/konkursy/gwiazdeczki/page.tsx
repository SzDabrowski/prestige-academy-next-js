"use client";

import React, { useState } from "react";
import DanceEventForm from "@/components/DanceEventForm/DanceEventForm";
import { PromoBanner } from "./promoBanner";
import { Toast } from "./toast";
import styles from "./page.module.scss";
import { Star, Sparkles, ChevronDown, Loader2 } from "lucide-react";

const Gwiazdeczki = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.blobPink} />
      <div className={styles.blobBlue} />

      <main className={styles.mainCard}>
        <div className={styles.formSection}>
          <div className={styles.header}>
            <div>
              <h1>
                TAŃCZĄCE
                <br />
                GWIAZDECZKI!
              </h1>
              <p>WYSTĘPY TANECZNE DLA DZIECI</p>
            </div>
            <div className={styles.titleStar}>
              <Star fill="#ffdc5d" className={styles.star1} />
              <Star fill="#ffdc5d" className={styles.star2} />
            </div>
          </div>
          <DanceEventForm onSuccess={() => setIsSuccess(true)} />
        </div>

        <div className={styles.visualSection}>
          <PromoBanner />
        </div>
      </main>

      {isSuccess && (
        <Toast
          message="Zgłoszenie wysłane pomyślnie! Do zobaczenia na scenie!"
          onClose={() => setIsSuccess(false)}
        />
      )}
    </div>
  );
};

export default Gwiazdeczki;
