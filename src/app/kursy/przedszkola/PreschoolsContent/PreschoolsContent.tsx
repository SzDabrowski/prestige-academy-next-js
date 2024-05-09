import styles from "./PreschoolsContent.module.scss";
import { Container } from "@/components/Container/Container";
import PreschoolsForm from "../PreschoolsForm/PreschoolsForm";

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
                Zapewnij swoje dziecko o kreatywnej zabawie i radości poprzez
                zapisy na zajęcia taneczne w naszym przedszkolu! Nasze
                profesjonalne instruktorki zapewnią nie tylko naukę podstawowych
                technik tanecznych, ale także rozwijanie pewności siebie i
                wyrazistości.{" "}
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
