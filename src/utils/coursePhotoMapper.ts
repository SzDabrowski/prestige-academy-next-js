import clipDance from "../../public/assets/images/courses/clip.jpg";
import bachata from "../../public/assets/images/courses/bachata.jpg";
import kids from "../../public/assets/images/courses/kids.jpg";
import kidsPair from "../../public/assets/images/courses/towarzyski-dzieci.jpg";
import latinoSolo from "../../public/assets/images/courses/latino-solo.jpg";
import adultsPair from "../../public/assets/images/courses/towarzyski.jpg";
import ladiesStyling from "../../public/assets/images/courses/ladies-styling.jpg";
import { StaticImageData } from "next/image";

// Create a function to map course titles with photos
const mapCourseToPhoto = (title: string) => {
  switch (title) {
    case "Bachata":
      return bachata;
    case "Ladies Styling":
      return ladiesStyling;
    case "Latino solo":
      return latinoSolo;
    case "Taniec Towarzyski dla dzieci":
      return kidsPair;
    case "Taniec dla dzieci 4-11 lat":
      return kids;
    case "Video Klip Dance":
      return clipDance;
    case "Taniec towarzyski":
      return adultsPair;
    default:
      return adultsPair; // Return an empty string for unknown courses
  }
};

export default mapCourseToPhoto;
