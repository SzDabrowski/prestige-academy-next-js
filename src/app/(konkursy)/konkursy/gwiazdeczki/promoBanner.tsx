import React from "react";
import { Calendar, Sparkles } from "lucide-react";
import styles from "./PromoBanner.module.scss";
import backgroundBanner from "../../../../../public/assets/images/konkurs.jpeg";
import Image from "next/image";

export const PromoBanner: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src={backgroundBanner}
        alt="Tańczące Gwiazdeczki"
        fill
        className={styles.bgImage}
        priority // loads immediately
      />

      {/* Overlays */}
      <div className={styles.gradientOverlay} />
      <div className={styles.overlayRadial} />

      <div className={styles.deadlineBadge}>
        <Calendar size={16} />
        <span>Zapisy do: 13.03</span>
      </div>

      <div className={styles.particleContainer}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <h2>
            Tańczące
            <br />
            Gwiazdeczki
          </h2>
          <div className={styles.yearPill}>2026</div>
          <Sparkles className={styles.sparkleIcon} />
          <div className={styles.lightPoint} />
        </div>
      </div>
    </div>
  );
};
