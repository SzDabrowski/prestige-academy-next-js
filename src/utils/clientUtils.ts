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

export function toCamelCase(str: string): string {
  // Define a mapping for Polish diacritical characters to their ASCII equivalents
  const polishToAscii: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };

  // Replace Polish characters with ASCII equivalents
  str = str
    .split("")
    .map((char) => polishToAscii[char] || char)
    .join("");

  // Convert to camelCase
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");
}
