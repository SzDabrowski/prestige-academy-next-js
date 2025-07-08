import styles from "@/app/page.module.css";

import { Contact } from "./(components)/Contact";

export default function Home() {
  return (
    <main className={styles.main}>
      <Contact />
    </main>
  );
}
