import Header from "@/components/Header/Header";
//import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";

export default function Home() {
  return (
    <main className={""}>
      <Header />
      <Container></Container>

      <Footer />
    </main>
  );
}
