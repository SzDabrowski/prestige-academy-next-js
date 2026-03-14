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
        
        <h2 className={styles.title}>Plan Wydarzenia Tanecznego</h2>
        
        <div className={styles.schedule}>
          <div className={styles.day}>
            <h3>Dzień 1 - Piątek</h3>
            <ul>
              <li><strong>17:00 - 18:30:</strong> Rejestracja i rozpoczęcie</li>
              <li><strong>18:30 - 20:00:</strong> Podstawy techniki tanecznej</li>
              <li><strong>20:00 - 22:00:</strong> Wieczorna integracja i practice</li>
            </ul>
          </div>

          <div className={styles.day}>
            <h3>Dzień 2 - Sobota</h3>
            <ul>
              <li><strong>10:00 - 11:30:</strong> Masterclass: Rytmika i dynamika</li>
              <li><strong>11:45 - 13:15:</strong> Choreografia - Część 1</li>
              <li><strong>13:15 - 15:00:</strong> Przerwa obiadowa</li>
              <li><strong>15:00 - 16:30:</strong> Choreografia - Część 2</li>
              <li><strong>16:45 - 18:15:</strong> Stretching i regeneracja</li>
              <li><strong>21:00 - 02:00:</strong> Impreza główna (Gala)</li>
            </ul>
          </div>

          <div className={styles.day}>
            <h3>Dzień 3 - Niedziela</h3>
            <ul>
              <li><strong>11:00 - 12:30:</strong> Masterclass: Partnerwork</li>
              <li><strong>12:45 - 14:15:</strong> Musicality - interpretacja muzyki</li>
              <li><strong>14:15 - 15:30:</strong> Przerwa obiadowa</li>
              <li><strong>15:30 - 17:00:</strong> Q&A i podsumowanie wydarzenia</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanceEventOverlay;