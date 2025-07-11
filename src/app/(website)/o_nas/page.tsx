import styles from "@/app/page.module.css";

import AboutUs from "./(components)/AboutUsSection/AboutUs";

/**
 * Renders the home page with the AboutUs section inside the main content area.
 *
 * @returns The JSX markup for the home page.
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <AboutUs />
    </main>
  );
}
