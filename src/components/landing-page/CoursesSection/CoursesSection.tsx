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
          Zapraszamy do zapoznania się z naszą ofertą zajeć dla dzieci,
          młodzieży oraz dorosłych. Niezależnie czy masz lat 4 czy 104 i chcesz
          tańczyć solo lub w parze u nas znajdziesz coś dla siebie! Nasza
          oferta, zawiera naukę rożnych stylów tańca oraz w różnej postaci tj.
          zajęcia grupowe, indywidualne, solo lub w parach. Jako jedyni w
          Stargardzie mamy ofertę Pro Am, czyli nauke prowadzoną przez
          profesjonalnego tancerza/ke z amatorem, czyli Tobą! Już teraz sprawdź
          nas i zapisz się na naukę tańca!
        </p>

        <div className={styles.container}>
          <div className={`${styles.wrapper} `}>
            <div className={styles.adults}>
              <Link href={"/kursy/" + courseForEnum.adults}>
                <div className={styles.textWrapper}>
                  <span>Taniec dla dorosłych - odkryj radość ruchu</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} `}>
            <div className={styles.kids}>
              <Link href={"/kursy/" + courseForEnum.kids}>
                <div className={styles.textWrapper}>
                  <span>Przygoda z tańcem dla najmłodyszch</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} `}>
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

          <div className={`${styles.wrapper} `}>
            <div className={styles.commissioned}>
              <Link href={"/kursy/" + courseForEnum.commissioned}>
                <div className={styles.textWrapper}>
                  <span>Grupy zlecone</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={`${styles.wrapper} ${styles.small}`}>
            <div className={styles.preschools}>
              <Link href={"/kursy/" + courseForEnum.preschools}>
                <div className={styles.textWrapper}>
                  <span>Przedszkola</span>
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
