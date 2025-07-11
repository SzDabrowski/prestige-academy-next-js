import clipDance from "../../public/assets/images/courses/VideoKlipDance.jpg";
import bachata from "../../public/assets/images/courses/bachataSolo.jpg";
import bachataPair from "../../public/assets/images/courses/bachata.jpg";
import kids4 from "../../public/assets/images/courses/KidsJunior.jpg";
import kids7 from "../../public/assets/images/courses/PrestigeJunior7.jpg";
import kidsPair from "../../public/assets/images/courses/TTDzieci.jpg";
import latinoSolo from "../../public/assets/images/courses/latinoSolo.jpg";
import salsaSolo from "../../public/assets/images/courses/salsaSolo.jpg";
import adultsPair from "../../public/assets/images/courses/towarzyski.jpg";
import ladiesStyling from "../../public/assets/images/courses/highHeels.jpg";
import commercial from "@/../public/assets/images/courses/commercial.png";
import jazz from "@/../public/assets/images/courses/jazz.jpg";
import showDance from "@/../public/assets/images/courses/LatinoShowDance.jpg";
import uzytkowy from "@/../public/assets/images/courses/uzytkowy.jpg";

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
      return kids4;
    case "Prestige Kids 3-4 lata":
      return kids7;
    case "Video Klip 8-11 lat":
      return clipDance;
    case "Taniec towarzyski":
      return adultsPair;
    case "Jazz i taniec wspolczesny":
      return jazz;
    case "Hip Hop commercial":
      return commercial;
    case "Latino Show Dance":
      return showDance;
    case "Taniec uzytkowy":
      return uzytkowy;
    default:
      return adultsPair; // Return an empty string for unknown courses
  }
};

export default mapCourseToPhoto;
