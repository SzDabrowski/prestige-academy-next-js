import Header from "@/components/Header/Header";
import Container from "@/components/Container/Container";
import NotificationBar from "@/components/NotificationBar/NotificationBar";
import { PrestigeLogoIcon } from "@/components/icons/LogoIcon/PrestigeLogoIcon";

import ContactForm from "@/components/ContactForm/ContactForm";

/**
 * Provides a layout wrapper that displays a header above the given child content.
 *
 * @param children - The content to be rendered below the header
 * @returns The layout with a header and the specified children
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
