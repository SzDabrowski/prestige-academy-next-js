"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";
import ChangeHeader from "./ChangeHeader";
import Script from "next/script";
import { NextScript } from "next/document";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1968926770230087');
fbq('track', 'PageView');
`,
        }}
      />
      <head>
        <title>Prestige</title>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=1968926770230087&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body>
        <ChangeHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
