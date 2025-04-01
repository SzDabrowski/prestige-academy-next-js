"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCookiesConsent } from "@/hooks/useCookieConsent";
import styles from "./CookieConsentBanner.module.scss";

type CookieConsentProps = {
  variant?: "default" | "small";
  demo?: boolean;
  display: boolean;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
};

export default function CookieConsentBanner({
  variant = "default",
  demo = false,
  display,
  onAcceptCallback = () => {},
}: CookieConsentProps) {
  const { cookiesAccepted, setCookiesConsent } = useCookiesConsent();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [_display] = useState<boolean>(display);

  const accept = () => {
    setIsOpen(false);
    setCookiesConsent(true); // Update the Zustand state and set the cookie
    setTimeout(() => {
      setHide(true); // Hide after animation
    }, 700);
    onAcceptCallback(); // Trigger the accept callback
  };

  const decline = () => {
    deleteCookies();
    setIsOpen(false);
    setCookiesConsent(false);
    setTimeout(() => {
      setHide(true); // Hide after animation
    }, 700);
  };

  const deleteCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  useEffect(() => {
    // Check if the cookieConsent cookie is already set
    const consent = document.cookie.includes("CookieConsentAccepted=true");
    if (consent) {
      if (!_display) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      } else {
        setIsOpen(true);
        setHide(false);
      }
    } else {
      setIsOpen(true); // Show the banner if consent is not set
    }
  }, [_display, demo]);

  // If cookies are already accepted, do not show the banner
  if ((cookiesAccepted || hide) && !display) {
    return null;
  }

  return variant !== "small" ? (
    <div
      className={`${styles.cookieBanner} ${!isOpen ? styles.closed : ""} ${hide ? styles.hidden : ""}`}
    >
      <div className={styles.cookieBannerContent}>
        <div className={styles.cookieBannerHeader}>
          <h1 className={styles.cookieBannerTitle}>Używamy plików cookie</h1>
          <CookieIcon className={styles.cookieIcon} />
        </div>
        <div className={styles.cookieBannerBody}>
          <p className="text-sm font-normal text-start">
            Używamy plików cookie, aby zapewnić Ci najlepsze doświadczenia na
            naszej stronie internetowej. Aby uzyskać więcej informacji o tym,
            jak używamy plików cookie, zapoznaj się z naszą polityką plików
            cookie.
            <br />
            <br />
            <span className="text-xs">
              Klikając &quot;{" "}
              <span className="font-medium opacity-80">Akceptuję</span> &quot;,
              zgadzasz się na używanie plików cookie.
            </span>
            <br />
            <a href="#" className={styles.cookieLink}>
              Dowiedz się więcej.
            </a>
          </p>
        </div>
        <div className={styles.cookieBannerFooter}>
          <div className={styles.cookieBannerButtons}>
            <button onClick={accept} className={styles.cookieAcceptButton}>
              Akceptuję
            </button>
            <button
              onClick={decline}
              className={`${styles.cookieDeclineButton} `}
            >
              Odrzucam
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`${styles.cookieBanner} ${!isOpen ? styles.closed : ""} ${hide ? styles.hidden : ""}`}
    >
      <div className={styles.cookieBannerContent}>
        <div className={styles.cookieBannerHeader}>
          <h1 className={styles.cookieBannerTitle}>Używamy plików cookie</h1>
          <CookieIcon className={styles.cookieIcon} />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-sm text-left text-muted-foreground">
            Używamy plików cookie, aby zapewnić Ci najlepsze doświadczenia na
            naszej stronie internetowej. Aby uzyskać więcej informacji o tym,
            jak używamy plików cookie, zapoznaj się z naszą polityką plików
            cookie.
          </p>
        </div>
        <div className={styles.cookieBannerFooter}>
          <button onClick={accept} className={styles.button}>
            Akceptuję
          </button>
          <button onClick={decline} className={styles.button}>
            Odrzucam
          </button>
        </div>
      </div>
    </div>
  );
}
