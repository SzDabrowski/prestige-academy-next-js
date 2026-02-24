"use server";

import styles from "./CommissionedContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

import { getContentfulData } from "@/lib/contentful/serverActions/coursesGroups";

import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const CommissionedContent = async () => {
  const { data, image } = await getContentfulData({
    courseTitle: "Grupy zlecone",
  });

  // Check if data was found
  if (!data || !image) {
    notFound();
  }

  const { title, description } = data;
  return (
    <div>
      <section className={styles.hero}>
        <Image
          className={styles.image}
          src={`https:${image.url}`}
          height={image.height}
          width={image.width}
          alt={`${title} course image`}
        />
      </section>

      <main>
        <section className={styles.title}>
          <Container>
            <h1>{String(title)}</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              {description && documentToReactComponents(description)}
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
