"use client";
import courseData from "@/types/courseTypes";

export const checkIfInMobileView = () => {
  if (window.innerWidth <= 768) {
    return true;
  } else {
    return false;
  }
};

export function findCourseByTitle(
  json: courseData[],
  course: string
): courseData {
  let foundCourse: courseData = {
    title: "",
    img: "",
    pair: false,
    data: {
      for: "",
      description: "",
      summary: "",
      timeInfo: "",
      recruitment: false,
      price: "",
    },
  };
  json.forEach((item: courseData) => {
    if (toCamelCase(item.title) === toCamelCase(course)) {
      foundCourse = item;
    }
  });
  return foundCourse;
}

export function checkIfCourseForPairs(
  json: courseData[],
  courseName: string
): boolean {
  const foundCourse = findCourseByTitle(json, courseName);

  if (foundCourse.pair) {
    return foundCourse.pair;
  } else {
    return false;
  }
}

export function toCamelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
