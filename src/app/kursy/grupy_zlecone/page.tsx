import Header from "@/components/Header/Header";
//import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import CommissionedContent from "./CommissionedContent/CommissionedContent";

export default function Home() {
  return (
    <main className={""}>
      <Header />
      <CommissionedContent />
      <Footer />
    </main>
  );
}
