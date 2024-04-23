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
          Już od niemal 10 lat prowadzimy naukę tańca dla dzieci w przedszkolach
          oraz poza nimi na terenie stargardu i okolic, a od nie dawna
          prowadzimy również kursy tańca dla dorosłych.
        </p>
        <p>
          Co roku staramy się poszerzać naszą ofertę, aby sprostać wymaganiom,
          tych dla których taniec jest formą mile spędzonego czasu.
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

          <div className={`${styles.wrapper} ${styles.small}`}>
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

          <div className={`${styles.wrapper} ${styles.small}`}>
            <div className={styles.commissioned}>
              <Link href={"/kursy/" + courseForEnum.commissioned}>
                <div className={styles.textWrapper}>
                  <span>Grupy zlecone</span>
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
