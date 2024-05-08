import styles from "./PreschoolsContent.module.scss";
import { Container } from "@/components/Container/Container";

const PreschoolContent = () => {
  return (
    <div>
      <section className={styles.hero}></section>
      <main>
        <section className={styles.title}>
          <Container>
            <h1>Zapisz swoje dziecko na zajęcia w przedszkolu</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              <p></p>
            </div>
          </Container>
        </section>
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h2>Napisz do nas!</h2>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default PreschoolContent;
