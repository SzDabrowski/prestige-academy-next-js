import styles from "./FirstDanceContent.module.scss";

import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

import Video from "next-video";
import { fetchCourseData } from "@/lib/contentful/serverActions/coursesGroups";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import firstDanceVideo from "@/../videos/first_dance_video.mp4";
import Image from "next/image";

export const FirstDanceContent = async () => {
  const data = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle: "Pierwszy taniec weselny",
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
              {documentToReactComponents(description!)}
            </div>
          </Container>
        </section>
        {/* <section className={styles.videoSection}>
          <Container>
            <h2>Zobacz jedną z naszych choreografii:</h2>
            <div className={styles.wrapper}>
              <Video src={firstDanceVideo} />
            </div>
          </Container>
        </section> */}
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h3>Zapisz sie!</h3>
              <ContactForm courseName="Pierwszy taniec weselny" />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};
