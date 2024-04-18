import Header from "@/components/Header/Header";
import styles from "../page.module.css";
import Footer from "@/components/Footer/Footer";
import { Contact } from "./(components)/Contact";

export default function Home() {
  return (
    <main className={styles.main}>
      <Contact />
    </main>
  );
}
