"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useCookiesConsent } from "@/hooks/useCookieConsent";

// Declare fbq on the window object
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

function FbPixel() {
  const { cookiesAccepted } = useCookiesConsent();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      if (cookiesAccepted) {
        window.fbq("consent", "grant");
        window.fbq("init", "1968926770230087");
        window.fbq("track", "PageView");
      } else {
        window.fbq("consent", "revoke");
      }
    }
  }, [cookiesAccepted]);

  return (
    <>
      {cookiesAccepted && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            `,
          }}
        />
      )}
    </>
  );
}

export default FbPixel;
