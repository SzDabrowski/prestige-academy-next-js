import React, { useEffect } from "react";
import { Container } from "@/components/Container/Container";

import styles from "./Hero.module.scss";

function Hero() {
  return (
    <div className={styles.heroWrapper}>
      <section className={styles.hero} id="hero">
        <Container>
          <div className={styles.flexContainer}>
            <div className="text-center place-items-center pt-16 pb-8  md:pt-24">
              <div className={styles.textContent}>
                <h1>
                  Twoja przygoda z tańcem
                  <br /> zaczyna się tutaj!
                </h1>
                <p className="m-auto text-lg mt-4 text-white max-w-xl">
                  <wbr /> Przygotuj się na intensywne emocje i pełną energii
                  podróż przez świat tańca. Z nami każdy krok to niezapomniane
                  doświadczenie!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Hero;
