import styles from "./CommissionedContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";

const CommissionedContent = () => {
  return (
    <div>
      <section className={styles.hero}></section>
      <main>
        <section className={styles.title}>
          <Container>
            <h1>Grupy zlecone</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              <p>
                Zbliża się event w Waszej firmie lub chcecie zorganizować naukę
                tańca dla swoich pracowników lub grupy przyjaciół? Skorzystaj z
                naszej oferty nauki tańca z zakresu tańców latynoskich takich
                jak bachata, salsa, Samba, cha cha itp. To świetny sposób na
                wspólne spędzenie czasu oraz fantastyczną zabawę! Skontaktuj się
                z nami a Przedstawimy Wam ofertę!
              </p>
            </div>
          </Container>
        </section>
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h3>Napisz do nas!</h3>
              <ContactForm />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default CommissionedContent;
