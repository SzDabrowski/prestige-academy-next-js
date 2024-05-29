import styles from "./FirstDanceContent.module.scss";
import { Container } from "@/components/Container/Container";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import Video from "next-video";

import firstDanceVideo from "@/../videos/first_dance_video.mp4";

export const FirstDanceContent = () => {
  return (
    <div>
      <section className={styles.hero}></section>

      <main>
        <section className={styles.title}>
          <Container>
            <h1>PIERWSZY TANIEC WESELNY</h1>
            <div className={styles.textContent}>
              <div className={styles.whiteSpace}></div>
              <p>
                Pierwszy taniec na weselu to nie tylko tradycja, ale też
                wyjątkowa przyjemność. Czas spędzony razem na zajęciach
                tanecznych, gdzie przygotowujecie swój taniec, to świetna okazja
                na oderwanie się od codzienności i wspólne emocje. Istotne jest,
                aby ten taniec odzwierciedlał wasze uczucia i unikalną relację.
                Naszym celem jest stworzenie choreografii, która doskonale odda
                esencję Waszej miłości. Jesteśmy przekonani, że taniec to
                opowieść, a Wasz taniec to historia Waszej wspólnej drogi. Może
                być romantyczny, pełen energii, spokojny albo z nutą szaleństwa
                - dostosujemy się do Waszych życzeń.
              </p>
              <div className={styles.whiteSpace}></div>
              <p>
                Ten moment to prezent dla Was i Waszych bliskich, na który
                wszyscy czekają z niecierpliwością. Wspólnie stworzymy unikalną
                choreografię, dostosowaną do waszych preferencji i wybranego
                utworu.
              </p>
              <p></p>
              <div className={styles.whiteSpace}></div>
              <p className={styles.big}>
                Razem uczynimy go niezapomnianym przeżyciem!
              </p>
            </div>
          </Container>
        </section>
        <section className={styles.videoSection}>
          <Container>
            <h2>Zobacz jedną z naszych choreografii:</h2>
            <div className={styles.wrapper}>
              <Video src={firstDanceVideo} />
            </div>
          </Container>
        </section>
        <section className={styles.formSection}>
          <Container>
            <div className={styles.formWrapper}>
              <h3>Zapisz sie!</h3>
              <ContactForm courseName="Pierwszy taniec weselny" />
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};
