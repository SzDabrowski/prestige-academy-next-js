import { use } from "react";
import { Container } from "@/components/Container/Container";
import { CoursesContent } from "./components/CoursesContent";

import styles from "./page.module.scss";

export default function Page({
  params,
}: {
  params: Promise<{ coursesFor: string }>;
}) {
  const { coursesFor } = use(params);

  return (
    <main className={styles.main}>
      <Container>
        <CoursesContent group={coursesFor} />
      </Container>
    </main>
  );
}
