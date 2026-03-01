import styles from "@/app/page.module.css";

import Contact from "./(components)/Contact";

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
