"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

import GoogleCaptchaWrapper from "@/components/Recaptcha/GoogleCaptchaWrapper";
import { PostHogProvider } from "@/components/PosthogProvider";
import { Analytics } from "@vercel/analytics/react";
import icon from "../../public/assets/images/logo/prestigeLogoOnly.png";

import Footer from "@/components/Footer/Footer";

import CookieConsentToogler from "@/components/Cookies/CookieConsentToogler";

import FbPixel from "@/components/FbPixel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <title>Prestige</title>
        <link rel="icon" href={icon.src} sizes="" />
        {/* <CookiesBot /> */}
        <FbPixel />
      </head>

      <body>
        <GoogleCaptchaWrapper>
          <PostHogProvider>{children}</PostHogProvider>
        </GoogleCaptchaWrapper>
        <Analytics />
        <Footer />
        <CookieConsentToogler />
      </body>
    </html>
  );
}
