"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "lucide-react";
import CookieConsentBanner from "./CookieConsentBanner";
import styles from "./CookieConsentToggler.module.scss"; /**
 * Displays a button to toggle the cookie consent banner and automatically shows the banner if consent has not been given.
 *
 * Checks for the "CookieConsentAccepted" cookie on mount and displays the consent banner if not present. Allows users to manually open or close the banner using the provided button.
 *
 * @returns The rendered cookie consent toggler component.
 */

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
