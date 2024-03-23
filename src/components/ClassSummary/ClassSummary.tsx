import { Container } from "@/components/Container/Container";
import styles from "./ClassSummary.module.scss";
import Image from "next/image";
import classImage from "../../assets/images/article.jpg";

interface iClassSummary {
  title: string;
  summary: string;
}

export const ClassSummary = (props: iClassSummary) => {
  return (
    <section className={styles.danceClass}>
      <div className={styles.imgWrapper}>
        {" "}
        <Image src={classImage} alt={""} />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.title}>{props.title}</span>
        <p>{props.summary}</p>

        <span className={styles.seeMore}>
          <a href="">[zobacz więcej...]</a>
        </span>
      </div>
    </section>
  );
};
