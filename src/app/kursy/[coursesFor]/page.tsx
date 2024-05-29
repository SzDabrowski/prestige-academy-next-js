import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import { CoursesContent } from "./components/CoursesContent";
import { useRouter } from "next/router";

export default function Home({ params }: { params: any }) {
  return (
    <main className={styles.main}>
      <Container>
        <CoursesContent group={params.coursesFor} />
      </Container>
    </main>
  );
}
