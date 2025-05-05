import Header from "@/components/Header/Header";
import styles from "@/app/page.module.css";
import Footer from "@/components/Footer/Footer";
import AboutUs from "./(components)/AboutUsSection/AboutUs";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutUs />
    </main>
  );
}
