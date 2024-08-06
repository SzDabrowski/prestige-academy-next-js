"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import { CourseContent } from "./CourseContent/CourseContent";

import courseData from "@/types/courseTypes";
import danceCoursesJSON from "../../../../data/danceCourses.json";
import { findCourseByTitle } from "../../../../utils/clientUtils";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";

type tCourseData = courseData;

export default function Home() {
  const params = useParams();
  const danceGroup = params.coursesFor;

  console.log(danceGroup);
  const courseData: tCourseData = findCourseByTitle(
    danceCoursesJSON,
    String(params.course)
  );

  return (
    <main className={""}>
      <Container>
        <CourseContent data={courseData} group={String(danceGroup)} />
      </Container>
    </main>
  );
}
