import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

import GoogleCaptchaWrapper from "@/components/Recaptcha/GoogleCaptchaWrapper";
import { PostHogProvider } from "@/components/PosthogProvider";
import { Analytics } from "@vercel/analytics/react";
import icon from "../../public/assets/images/logo/prestigeLogoOnly.png";

import Footer from "@/components/Footer/Footer";
import CookieConsentToggler from "@/components/Cookies/CookieConsentToggler";
import FbPixel from "@/components/FbPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prestige Academy",
  description: "Your description here",
  icons: {
    icon: icon.src,
  },
};

/**
 * Defines the root layout for the application, applying global providers, analytics, and UI elements.
 *
 * Wraps all page content with Google reCAPTCHA, PostHog analytics context, Vercel Analytics, Facebook Pixel, a footer, and cookie consent management. Sets the global font and language for the HTML document.
 *
 * @param children - The page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <FbPixel />
      </head>
      <body className={inter.className}>
        <GoogleCaptchaWrapper>
          <PostHogProvider>{children}</PostHogProvider>
        </GoogleCaptchaWrapper>
        <Analytics />
        <Footer />
        <CookieConsentToggler />
      </body>
    </html>
  );
}
