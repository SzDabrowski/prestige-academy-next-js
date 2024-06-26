import Image from "next/image";
import LandingHeader from "@/components/landing-page/LandingHeader/LandingHeader";
import styles from "./page.module.css";
import Hero from "@/components/landing-page/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import CoursesSection from "@/components/landing-page/CoursesSection/CoursesSection";
import AboutUsSection from "@/components/landing-page/AboutUsSection/AboutUsSection";
import { Container } from "@/components/Container/Container";
import CourseForm from "@/components/CourseForm/CourseForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Container>
        <CourseForm />
      </Container>
      <CoursesSection />
      <AboutUsSection />
    </main>
  );
}
