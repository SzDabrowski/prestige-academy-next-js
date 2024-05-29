"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Footer from "@/components/Footer/Footer";
import ChangeHeader from "./ChangeHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <title>Prestige</title>
      </head>
      <body>
        <ChangeHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
