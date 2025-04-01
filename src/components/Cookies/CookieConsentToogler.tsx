"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "lucide-react";
import CookieConsentBanner from "./CookieConsentBanner";

export default function CookieConsentToogler() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = document.cookie.includes(
      "CookieConsentAccepted=true"
    );
    if (!cookieConsent) {
      setOpen(true); // Show the banner only if the cookie isn't set
    }
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleOpen}>
        <CookieIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
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
