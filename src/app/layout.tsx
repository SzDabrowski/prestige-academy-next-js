"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";
import ChangeHeader from "./ChangeHeader";

import GoogleCaptchaWrapper from "@/components/Recaptcha/GoogleCaptchaWrapper";
import { Analytics } from "@vercel/analytics/react";
import icon from "../../public/assets/images/logo/prestigeLogoOnly.png";
import NotificationBar from "@/components/NotificationBar/NotificationBar";

import CookiesBot from "@/components/CookiesBot";
import FbPixel from "@/components/FbPixel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <title>Prestige</title>
        <link rel="icon" href={icon.src} sizes="" />
        {/* <CookiesBot /> */}
        <FbPixel />
      </head>

      <body>
        <ChangeHeader />
        <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
