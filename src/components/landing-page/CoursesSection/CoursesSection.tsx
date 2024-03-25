import styles from "./CoursesSection.module.scss";
import { Container } from "@/components/Container/Container";
import { courseForEnum } from "@/lib/enums";
import Link from "next/link";

const CoursesSection = () => {
  return (
    <Container>
      <section className={styles.section}>
        <h2 className={styles.header}>Kursy tańca</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
          massa enim. In est nunc, consequat non sodales a, tempus eget augue.
        </p>

        <div className={styles.container}>
          <div className={`${styles.wrapper} ${styles.small}`}>
            <div className={styles.adults}>
              <Link href={"/kursy/" + courseForEnum.adults}>
                <div className={styles.textWrapper}>
                  <span>Taniec dla dorosłych - odkryj radość ruchu</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} ${styles.small}`}>
            <div className={styles.kids}>
              <Link href={"/kursy/" + courseForEnum.kids}>
                <div className={styles.textWrapper}>
                  <span>Przygoda z tańcem dla najmłodyszch</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} ${styles.wide}`}>
            <div className={styles.wedding}>
              <Link href={"/kursy/" + courseForEnum.firstDance}>
                <div className={styles.textWrapper}>
                  <span>
                    Wyjątkowy pierwszy taniec - indywidualne kursy dla par
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default CoursesSection;
