import styles from "./FirstDanceContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

import { getContentfulData } from "@/lib/contentful/serverActions/coursesGroups"; // Import the new function
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { TypeCourseGroupFields } from "@/types/typeCourseGroupSkeleton";

export const FirstDanceContent = async () => {
  const { data, image } = await getContentfulData({
    courseTitle: "Pierwszy taniec weselny",
  });

  // Check if data was found
  if (!data || !image) {
    notFound();
  }

  const { title, description } = data;

  return (
    <div>
      <section className={styles.hero}>
        {image ? (
          <Image
            className={styles.image}
            src={`https:${image.url}`}
            height={image?.height}
            width={image?.width}
            alt={String(title)}
          />
        ) : (
          <main>Image data is not available</main>
        )}
      </section>

      <main>
        <section className={styles.title}>
          <Container>
            <h1>{String(title)}</h1>
            <div className={styles.textContent}>
              {description && documentToReactComponents(description)}
            </div>
          </Container>
        </section>

        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h3>Zapisz się!</h3>
              <ContactForm courseName="Pierwszy taniec weselny" />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default FirstDanceContent;
