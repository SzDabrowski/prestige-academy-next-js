import styles from "./PreschoolsContent.module.scss";
import { Container } from "@/components/Container/Container";
import PreschoolsForm from "../../../../components/PreschoolsForm/PreschoolsForm";

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
              <p>
                Zapewnij swojemu dziecku rozwoj kreatywnosci podczas nauki i
                zabawy jednocześnie. Zapisz swoje dziecko na zajecia taneczne w
                przedszkolu! Nasi profesjonalni instruktorzy zapewnią nie tylko
                naukę podstawowych technik tańca, ale rowniez rozwijanie
                umiejetnosci tanecznych i pewnosci siebie
              </p>
            </div>
          </Container>
        </section>
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h2>Napisz do nas!</h2>
              <PreschoolsForm />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default PreschoolContent;
