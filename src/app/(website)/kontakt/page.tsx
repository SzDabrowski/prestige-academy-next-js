import styles from "@/app/page.module.css";

import Contact from "./(components)/Contact";

import ContactForm from "@/components/ContactForm/ContactForm";
import Header from "@/components/Header/Header";
console.log({ ContactForm, Header });

/**
 * Renders the home page with the main layout and the Contact component.
 *
 * @returns The JSX structure for the home page.
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <Contact />
    </main>
  );
}
