"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./DanceEventOverlay.module.scss";

interface DanceEventOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DanceEventOverlay = ({ isOpen, onClose }: DanceEventOverlayProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Zamknij">
          <X size={32} />
        </button>
        
        <h2 className={styles.title}>Tańczące Gwiazdeczki - Plan Wydarzenia</h2>
        
        <div className={styles.schedule}>
          <div className={styles.day}>
            <h3>I BLOK: 10:00 - 11:15</h3>
            <p className={styles.assemblyTime}>ZBIÓRKA DZIECI: 9:45</p>
            <ul>
              <li>• VIDEO KLIP DANCE 8-10 LAT</li>
              <li>• Dance Mix 3-4 latki</li>
              <li>• Przedszkole TPD Witkowo oraz Kluczewo</li>
            </ul>
          </div>

          <div className={styles.day}>
            <h3>II BLOK: 12:15 - 13:20</h3>
            <p className={styles.assemblyTime}>ZBIÓRKA DZIECI: 12:00</p>
            <ul>
              <li>• Przedszkole Miejskie nr 1 oddział przy ul. Limanowskiego (gr. Jabłuszka + Malinki)</li>
              <li>• Przedszkole Miejskie nr 3</li>
              <li>• Przedszkole Miejskie nr 3 oddział</li>
              <li>• Przedszkole Miejskie nr 4</li>
              <li>• Przedszkole Miejskie nr 5</li>
              <li>• Przedszkole TPD Grzędzice</li>
              <li>• Przedszkole TPD Pęzino</li>
              <li>• Domowe Przedszkole Kubusia Puchata</li>
              <li>• Niepubliczne Przedszkole Tęczowa Przygoda</li>
              <li>• Niepubliczne Przedszkole Junior</li>
            </ul>
          </div>

          <div className={styles.day}>
            <h3>III BLOK: 14:15 - 15:45</h3>
            <p className={styles.assemblyTime}>ZBIÓRKA DZIECI: 14:00</p>
            <ul>
              <li>• Szkoła Podstawowa nr 6 (Zespół Szkolno-Przedszkolny Nr 1 os. Pyrzyckie) Klasy 0-3</li>
              <li>• Przedszkole nr 7 os. Pyrzyckie</li>
              <li>• Przedszkole TPD w Suchaniu</li>
              <li>• Przedszkole TPD na os. Lotnisko</li>
              <li>• Przedszkole Miejskie nr 1 oddział przy ul. Limanowskiego (gr. Poziomki + Jagódki)</li>
              <li>• Dance Mix 5-7 lat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanceEventOverlay;