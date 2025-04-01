"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCookiesConsent } from "@/hooks/useCookieConsent";

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
}: // onDeclineCallback = () => {},
CookieConsentProps) {
  const { cookiesAccepted, setCookiesAccepted } = useCookiesConsent();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [_display] = useState<boolean>(display);

  const accept = () => {
    setIsOpen(false);
    setCookiesAccepted(); // Update the Zustand state and set the cookie
    setTimeout(() => {
      setHide(true); // Hide after animation
    }, 700);
    onAcceptCallback(); // Trigger the accept callback
  };

  const decline = () => {
    deleteCookies();
    setIsOpen(false);
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
        console.log(isOpen);
      }
    } else {
      setIsOpen(true); // Show the banner if consent is not set
    }
  }, [_display, isOpen, demo]);

  // If cookies are already accepted, do not show the banner
  if ((cookiesAccepted || hide) && !display) {
    return null;
  }

  return variant !== "small" ? (
    <div
      className={`fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700 ${
        !isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
      } ${hide && "hidden"}`}
    >
      <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">Używamy plików cookie</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              Używamy plików cookie, aby zapewnić Ci najlepsze doświadczenia na
              naszej stronie internetowej. Aby uzyskać więcej informacji o tym,
              jak używamy plików cookie, zapoznaj się z naszą polityką plików
              cookie.
              <br />
              <br />
              <span className="text-xs">
                Klikając &quot
                <span className="font-medium opacity-80">Akceptuję</span>
                &quot, zgadzasz się na używanie plików cookie.
              </span>
              <br />
              <a href="#" className="text-xs underline">
                Dowiedz się więcej.
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={accept} className="w-full">
              Akceptuję
            </Button>
            <Button onClick={decline} className="w-full" variant="secondary">
              Odrzucam
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700 ${
        !isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
      } ${hide && "hidden"}`}
    >
      <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-lg font-medium">Używamy plików cookie</h1>
          <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-sm text-left text-muted-foreground">
            Używamy plików cookie, aby zapewnić Ci najlepsze doświadczenia na
            naszej stronie internetowej. Aby uzyskać więcej informacji o tym,
            jak używamy plików cookie, zapoznaj się z naszą polityką plików
            cookie.
          </p>
        </div>
        <div className="p-3 flex items-center gap-2 mt-2 border-t">
          <Button onClick={accept} className="w-full h-9 rounded-full">
            Akceptuję
          </Button>
          <Button
            onClick={decline}
            className="w-full h-9 rounded-full"
            variant="outline"
          >
            Odrzucam
          </Button>
        </div>
      </div>
    </div>
  );
}
