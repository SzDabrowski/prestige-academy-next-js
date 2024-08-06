"use client";

import styles from "./ClassSummary.module.scss";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { toCamelCase } from "../../utils/clientUtils";
import { getImageURL } from "../../utils/imageUtils";
import { courseForEnum } from "@/lib/enums";

interface iClassSummary {
  title: string;
  data: classData;
  img: StaticImageData;
}

interface classData {
  for: string;
  description: string | descriptionObject;
  summary: string;
}

interface descriptionObject {
  p1: string;
  p2: string;
  p3: string;
  p4?: string;
}

import CoursesData from "../../data/danceCourses.json";

export const ClassSummary = (props: iClassSummary) => {
  return (
    <section className={styles.danceClass}>
      <div className={styles.imgWrapper}>
        <Image src={props.img} alt={""} width={800} height={400} quality={70} />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.title}>{props.title}</span>
        <p>{props.data.summary}</p>

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
