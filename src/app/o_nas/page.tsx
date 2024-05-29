import Header from "@/components/Header/Header";
import styles from "../page.module.css";
import Footer from "@/components/Footer/Footer";
import AboutUs from "./(components)/AboutUsSection/AboutUs";

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutUs />
    </main>
  );
}
