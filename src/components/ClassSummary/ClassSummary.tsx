import { Container } from "@/components/Container/Container";
import styles from "./ClassSummary.module.scss";
import Image from "next/image";
import classImage from "../../assets/images/article.jpg";

interface iClassSummary {
  reverse?: boolean;
}

export const ClassSummary = (props: iClassSummary) => {
  return (
    <section className={styles.danceClass}>
      <div className={styles.imgWrapper}>
        {" "}
        <Image src={classImage} alt={""} width={200} height={200} />
      </div>
      <div
        className={`${styles.textContainer}  ${styles.wide} ${
          props.reverse ? styles.reverse : ""
        }`}
      >
        <span className={styles.title}>Salsa</span>
        <p>
          Salsa, wywodząca się z wpływów kubańskich i portorykańskich, to
          dynamiczny taniec partnerski. Napędzany afro-karaibskimi rytmami,
          łączy w sobie energetyczną pracę nóg, ruchy bioder i skomplikowane
          obroty. Salsa, dzięki zaraźliwej energii, tworzy dynamiczną więź
          między partnerami, tworząc soczystą i pełną życia atmosferę na
          parkiecie.
          <span>
            <a href="">[czytaj dalej...]</a>
          </span>
        </p>
      </div>
    </section>
  );
};
