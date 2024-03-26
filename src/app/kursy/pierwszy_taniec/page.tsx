import Header from "@/components/Header/Header";
//import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import { FirstDanceContent } from "./components/firstDanceContent/FirstDanceContent";

export default function Home() {
  return (
    <main className={""}>
      <Header />
      <FirstDanceContent />
      <Footer />
    </main>
  );
}
