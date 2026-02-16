import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toast}>
        <div className={styles.iconBox}>
          <CheckCircle2 size={24} color="#34d399" />
        </div>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={16} color="rgba(255,255,255,0.5)" />
        </button>
      </div>
    </div>
  );
};
