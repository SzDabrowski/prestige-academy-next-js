"use client";

import styles from "./ClassSummary.module.scss";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { toCamelCase } from "../../utils/clientUtils";
import { getImageURL } from "../../utils/imageUtils";
import { courseForEnum } from "@/lib/enums";

import courseData from "@/types/courseTypes";

import CoursesData from "../../data/danceCourses.json";

export const ClassSummary = (props: courseData) => {
  return (
    <section className={styles.danceClass}>
      <div className={styles.imgWrapper}>
        {props.data.recruitment && (
          <div className={styles.recruitmentBanner}>
            <p>Zapisy trwają!</p>
          </div>
        )}
        <Image src={props.img} alt={""} width={800} height={400} quality={70} />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.title}>{props.title}</span>
        <p
          onClick={() => {
            console.log(props.data.recruitment);
          }}
        >
          {props.data.summary}
        </p>

        <span className={styles.seeMore}>
          <Link
            href={`/kursy/${props.data.for}/${toCamelCase(props.title)}`}
            passHref
          >
            [zobacz więcej...]
          </Link>
        </span>
      </div>
    </section>
  );
};
