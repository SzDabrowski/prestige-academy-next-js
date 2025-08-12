"use client";

import styles from "./CourseContent.module.scss";
import CourseForm from "@/components/CourseForm/CourseForm";
import Image from "next/image";
import { fetchDanceGroupData } from "@/lib/contentful/serverActions/danceGroups";
import { Asset } from "contentful";

import { TypeDanceGroupFields } from "@/types/typeDanceGroupsSkeleton";
import { toCamelCase } from "@/utils/clientUtils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { iAssetLink } from "@/types/assetLinkType";

interface iCourseContent {
  groupFor: string;
  data: TypeDanceGroupFields;
}

export const CourseContent = (props: iCourseContent) => {
  const {
    targetGroup,
    title,
    titleId,
    image,
    pairClass,
    summary,
    description,
    recruitmentOpen,
    dateOfFirstClasses,
    price,
    location,
    classesTimeInformation,
    signUpTitle,
  } = props.data;

  return (
    <div className={styles.mainContainer}>
      <main className={styles.mainSection}>
        <div className={styles.heroSection}>
          <Image
            src={
              image.fields.file?.url
                ? `https:${image.fields.file.url}`
                : "/fallback-image.jpg"
            }
            alt={String(props.data.title)}
            width={800}
            height={400}
            quality={70}
          />
        </div>
        <div className={styles.textContent}>
          <span className={styles.danceGroup}>{`kursy/${props.groupFor}`}</span>
          <h1>{String(title)}</h1>
          <div className={styles.textContentContainer}>
            {description && documentToReactComponents(description!)}

            {price && <div className={styles.priceTag}>{price}</div>}

            {/* {hasVideos ? (
              <div className={styles.videoContainer}>
                <span>Zobacz jak wygląda ten taniec:</span>
                <div className={styles.videoWrapper}></div>
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>
      </main>
      <div className={styles.h2Wrapper}>
        <div className={styles.wrapperInner}>
          {props.data.signUpTitle ? (
            <h2>props.data.signUpTitle</h2>
          ) : (
            <h2>Zapisz się już dziś!</h2>
          )}

          {classesTimeInformation
            ? documentToReactComponents(classesTimeInformation!)
            : null}

          {dateOfFirstClasses ? (
            <div className={styles.firstEventInfo}>{dateOfFirstClasses}</div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {location ? <div className={styles.locationInfo}>{location}</div> : <></>}

      <div className={styles.contactWrapper}>
        <CourseForm selectedDanceCourse={String(title)} />
      </div>
    </div>
  );
};
