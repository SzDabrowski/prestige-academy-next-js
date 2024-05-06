"use client";

import styles from "./CourseContent.module.scss";
import CourseForm from "@/components/CourseForm/CourseForm";
import courseData from "@/types/courseTypes";
import Image from "next/image";
import { useState } from "react";

interface iCourseContent {
  data: courseData;
  group: string;
}
export const CourseContent = (props: iCourseContent) => {
  const [hasVideos, setHasVideo] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <main className={styles.mainSection}>
        <div className={styles.heroSection}>
          <Image
            src={`/assets/images/${
              props.data.img ? props.data.img : "article.jpg"
            }`}
            alt={""}
            width={800}
            height={400}
            quality={70}
          />
        </div>
        <div className={styles.textContent}>
          <span className={styles.danceGroup}>{`kursy/${props.group}`}</span>
          <h1>{props.data.title}</h1>
          <p>{props.data.data.description}</p>
          {hasVideos ? (
            <div className={styles.videoContainer}>
              <span>Zobacz jak wygląda ten taniec:</span>
              <div className={styles.videoWrapper}></div>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
      <div className={styles.contactWrapper}>
        <CourseForm selectedDanceCourse={props.data.title} />
      </div>
    </div>
  );
};
