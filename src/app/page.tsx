import Image from "next/image";
import LandingHeader from "@/components/landing-page/LandingHeader/LandingHeader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingHeader />
      <div className={styles.description}></div>
    </main>
  );
}
