import Header from "@/components/Header/Header";
import styles from "../../page.module.css";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import { ClassSummary } from "@/components/ClassSummary/ClassSummary";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Container>
        <ClassSummary />
        <ClassSummary reverse={true} />
        <ClassSummary />
      </Container>

      <Footer />
    </main>
  );
}
