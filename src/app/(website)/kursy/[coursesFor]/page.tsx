import { Container } from "@/components/Container/Container";
import { CoursesContent } from "./components/CoursesContent";

import styles from "./page.module.scss";

/**
 * React component that renders the courses page for a specified group.
 *
 * Awaits the `params` promise to extract the `coursesFor` value, which determines the group of courses to display.
 */
export default function Page({
  params,
}: {
  params: { coursesFor: string };
}) {
  const { coursesFor } = params;

  return (
    <main className={styles.main}>
      <Container>
        <CoursesContent group={coursesFor} />
      </Container>
    </main>
  );
}
