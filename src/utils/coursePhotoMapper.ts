import clipDance from "../../public/assets/images/courses/clip.jpg";
import bachata from "../../public/assets/images/courses/bachataSolo.jpg";
import bachataPair from "../../public/assets/images/courses/bachataPara.jpg";
import kids from "../../public/assets/images/courses/kids.jpg";
import kidsPair from "../../public/assets/images/courses/towarzyskiDzieci.jpg";
import latinoSolo from "../../public/assets/images/courses/latinoSolo.jpg";
import salsaSolo from "../../public/assets/images/courses/salsaSolo.jpg";
import adultsPair from "../../public/assets/images/courses/towarzyski.jpg";
import ladiesStyling from "../../public/assets/images/courses/highHeels.jpg";
import { StaticImageData } from "next/image";

// Create a function to map course titles with photos
const mapCourseToPhoto = (title: string) => {
  switch (title) {
    case "Bachata Solo":
      return bachata;
    case "Bachata w parach":
      return bachataPair;
    case "Salsa Solo":
      return salsaSolo;
    case "High Heels":
      return ladiesStyling;
    case "Latino solo":
      return latinoSolo;
    case "Taniec Towarzyski dla dzieci":
      return kidsPair;
    case "Prestige Junior 5-7 lat":
      return kids;
    case "Prestige Kids 3-4 lata":
      return kids;

    case "Video Klip 8 - 11 lat":
      return clipDance;
    case "Taniec towarzyski":
      return adultsPair;
    default:
      return adultsPair; // Return an empty string for unknown courses
  }
};

export default mapCourseToPhoto;
