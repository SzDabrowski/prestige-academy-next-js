import LandingHeader from "@/components/landing-page/LandingHeader/LandingHeader";
import styles from "./page.module.css";
import Hero from "@/components/landing-page/Hero/Hero";

import CoursesSection from "@/components/landing-page/CoursesSection/CoursesSection";
import AboutUsSection from "@/components/landing-page/AboutUsSection/AboutUsSection";
import { Container } from "@/components/Container/Container";
import CourseForm from "@/components/CourseForm/CourseForm";

/**
 * Renders the main landing page layout, composing the header, hero section, course form, courses list, and about us section.
 *
 * This component serves as the entry point for the landing page, arranging all primary sections in order.
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <LandingHeader />
      <Hero />
      <Container>
        <CourseForm />
      </Container>
      <CoursesSection />
      <AboutUsSection />
    </main>
  );
}
