import styles from "@/app/page.module.css";

import AboutUs from "./(components)/AboutUsSection/AboutUs";

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutUs />
    </main>
  );
}
