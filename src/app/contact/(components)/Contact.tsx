import { Container } from "@/components/Container/Container";
import styles from "./Contact.module.scss";

export const Contact = () => {
  return (
    <Container>
      <div className={styles.title}>
        <h1>Contact</h1>
        <span>We are a here to help.</span>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h2>Contact Astroship</h2>
          <p>
            Have something to say? We are here to help. Fill up the form or send
            email or call phone.
          </p>
          <span>1734 Sanfransico, CA 93063</span>
          <span>hello@astroshipstarter.com</span>
          <span>+1 (987) 4587 899</span>
        </div>
        <div className={styles.contactForm}>
          <form
            action="
			"
          >
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email Adress" />
            <input type="text" placeholder="Your Message" />
            <button>submit</button>
          </form>
        </div>
      </div>
    </Container>
  );
};
