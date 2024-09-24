import styles from "./CommissionedContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

import { fetchCourseData } from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";

import getTextValueContentful from "@/utils/getTextValueContentful";

const CommissionedContent = async () => {
  const pageContent = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle: "Grupy zlecone",
  });

  const descriptionContent = pageContent?.description?.content[0]?.content[0];
  const description = getTextValueContentful(descriptionContent);

  return (
    <div>
      <section className={styles.hero}></section>
      <main>
        <section className={styles.title}>
          <Container>
            <h1>{pageContent?.title}</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              <p>{description}</p>
            </div>
          </Container>
        </section>
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h2>Napisz do nas!</h2>
              <ContactForm courseName="Grupy zlecone" />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default CommissionedContent;
