"use server";

import styles from "./CommissionedContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

import { fetchCourseData } from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";

import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const CommissionedContent = async () => {
  const data = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle: "Grupy zlecone",
  });
  if (!data) {
    notFound();
  }

  const { title, description, image } = data;

  if (!image || !("fields" in image) || !image.fields.file) {
    return <main>Image data is not available</main>;
  }
  const { file } = image.fields;
  if (!file.url || !file.details || !file.details.image) {
    return <main>Invalid image data</main>;
  }

  return (
    <div>
      <section className={styles.hero}>
        <Image
          className={styles.image}
          src={`https:${file.url}`}
          height={file.details.image.height}
          width={file.details.image.width}
          alt={""}
        />
      </section>

      <main>
        <section className={styles.title}>
          <Container>
            <h1>{title}</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              {documentToReactComponents(description!)}
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
