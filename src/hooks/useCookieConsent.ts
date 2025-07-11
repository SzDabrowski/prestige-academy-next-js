import { create } from "zustand";

// Utility function to get a cookie by name (only for client-side)
const getCookie = (): boolean => {
  if (typeof window === "undefined") return false; // Ensure this runs only on the client

  const value = `; ${document.cookie}`;
  const parts = value.split(`; CookieConsentAccepted=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() === "true";
  }

  return false;
};

// Utility function to set a cookie (only for client-side)
const setCookie = (name: string, value: string, days: number) => {
  if (typeof window === "undefined") return; // Ensure this runs only on the client
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // Set expiration date
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`; // Set the cookie
};

interface iCookiesConsent {
  cookiesAccepted: boolean;
  setCookiesConsent: (decision: boolean) => void;
}

export const useCookiesConsent = create<iCookiesConsent>((set) => ({
  cookiesAccepted: getCookie() || false, // Default to false initially
  setCookiesConsent: (decision: boolean) => {
    // Update state and set cookie in localStorage
    set((state) => {
      const newState = decision;
      setCookie("CookieConsentAccepted", JSON.stringify(newState), 365); // Set cookie for 1 year
      return { cookiesAccepted: newState };
    });
  },
}));
