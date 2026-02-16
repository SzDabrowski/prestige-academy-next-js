import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./DanceEventBanner.module.scss";
import Image from "next/image";
import Background from "./background.jpg";
import Link from "next/link";
import backgroundBanner from "../../../public/assets/images/konkurs.jpeg";

export function DanceBanner() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.flexWrapper}>
        <div className={styles.textContent}>
          <div className={styles.waveWrapper}>
            <svg
              className={styles.waveSvg}
              viewBox="0 0 320 1440"
              preserveAspectRatio="none"
            >
              <path d="M64,0L69.3,48C75,96,85,192,80,288C75,384,53,480,48,576C43,672,53,768,85.3,864C117,960,171,1056,197.3,1152C224,1248,224,1344,224,1392L224,1440L0,1440L0,1392C0,1344,0,1248,0,1152C0,1056,0,960,0,864C0,768,0,672,0,576C0,480,0,384,0,288C0,192,0,96,0,48L0,0Z" />
            </svg>
          </div>

          <div className={styles.contentInner}>
            <h1 className={styles.heading}>
              TAŃCZĄCE GWIAZDECZKI!
              <Sparkles className={styles.sparkleIcon} />
            </h1>

            <div className={styles.subHeadingGroup}>
              <p>WYSTĘPY TANECZNE DLA DZIECI</p>
              <p>ZAPISY OTWARTE!</p>
            </div>
            <button className={styles.ctaButton}>
              <Link href="/konkursy/gwiazdeczki">
                ZAPISZ DZIECKO TERAZ <ArrowRight />
              </Link>
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <Image
            className={styles.imagePlaceholder}
            src={backgroundBanner}
            alt="Dzieci tańczące na scenie"
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
}
