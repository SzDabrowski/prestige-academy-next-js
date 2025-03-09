import { Container } from "@/components/Container/Container";
import { CoursesContent } from "./components/CoursesContent";

import styles from "./page.module.scss";

export default async function Home({ params }: { params: any }) {
  const resolvedParams = await params;
  return (
    <main className={styles.main}>
      <Container>
        <CoursesContent group={resolvedParams.coursesFor} />
      </Container>
    </main>
  );
}
