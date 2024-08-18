"use client";

import styles from "./CourseContent.module.scss";
import CourseForm from "@/components/CourseForm/CourseForm";
import courseData from "@/types/courseTypes";
import Image from "next/image";
import { useState } from "react";
import mapCourseToPhoto from "../../../../../utils/coursePhotoMapper";
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
            src={mapCourseToPhoto(props.data.title)}
            alt={""}
            width={800}
            height={400}
            quality={70}
          />
        </div>
        <div className={styles.textContent}>
          <span className={styles.danceGroup}>{`kursy/${props.group}`}</span>
          <h1>{props.data.title}</h1>
          <div className={styles.textContentContainer}>
            {typeof props.data.data.description === "object" ? (
              Object.values(props.data.data.description).map(
                (paragraph: any, index) => <p key={index}>{paragraph}</p>
              )
            ) : (
              <p>{props.data.data.description}</p>
            )}

            {props.data.data.price && (
              <div className={styles.priceTag}>{props.data.data.price}</div>
            )}

            {hasVideos ? (
              <div className={styles.videoContainer}>
                <span>Zobacz jak wygląda ten taniec:</span>
                <div className={styles.videoWrapper}></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
      <div className={styles.h2Wrapper}>
        <div className={styles.wrapperInner}>
          <h2>Zapisz się już dziś!</h2>
          {props.data.data.timeInfo ? (
            typeof props.data.data.timeInfo === "object" ? (
              Object.values(props.data.data.timeInfo).map(
                (paragraph: any, index) => (
                  <p className={styles.timeInfo} key={index}>
                    {paragraph}
                  </p>
                )
              )
            ) : (
              <p className={styles.timeInfo}>
                Zajęcia {props.data.data.timeInfo}
              </p>
            )
          ) : null}
        </div>
      </div>
      <div className={styles.timeInfo}></div>

      <div className={styles.contactWrapper}>
        <CourseForm selectedDanceCourse={props.data.title} />
      </div>
    </div>
  );
};
