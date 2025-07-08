"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "lucide-react";
import CookieConsentBanner from "./CookieConsentBanner";
import styles from "./CookieConsentToggler.module.scss"; // Import the SCSS module

export default function CookieConsentToggler() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("CookieConsentAccepted") === "true";
    if (!cookieConsent) {
      setOpen(true); // Show the banner only if the cookie isn't set
    }
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles["toggler-container"]}>
      <Button
        variant="outline"
        size="icon"
        className={styles.button}
        onClick={handleOpen}
      >
        <CookieIcon className={styles.icon} />
      </Button>
      {open && (
        <CookieConsentBanner
          display={open}
          variant="default"
          onAcceptCallback={() => setOpen(false)}
        />
      )}
    </div>
  );
}
