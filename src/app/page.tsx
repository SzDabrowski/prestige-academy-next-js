import Image from "next/image";
import LandingHeader from "@/components/landing-page/LandingHeader/LandingHeader";
import styles from "./page.module.css";
import Hero from "@/components/landing-page/Hero/Hero";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingHeader />
      <Hero />
      <div className={styles.description}></div>
      <Footer />
    </main>
  );
}
