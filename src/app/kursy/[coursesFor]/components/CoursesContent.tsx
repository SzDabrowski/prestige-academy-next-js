import styles from "./CoursesContent.module.scss";
import { ClassSummary } from "@/components/ClassSummary/ClassSummary";
import danceCourses from "../../../../data/danceCourses.json";
import { courseForEnum } from "@/lib/enums";
import mapCourseToPhoto from "../../../../utils/coursePhotoMapper";

interface iCoursesContent {
  group: string;
}

export const CoursesContent = (props: iCoursesContent) => {
  const returnGroupText = (group: string) => {
    switch (group) {
      case courseForEnum.adults:
        return "dorosłych";
      case courseForEnum.kids:
        return "dzieci";
      default:
        return "";
    }
  };

  return (
    <div className={styles.contentContainer}>
      <section className={styles.heading}>
        <h1 className={styles.mainHeader}> Kursy</h1>
        <p>dla {returnGroupText(props.group)}</p>
      </section>
      <section className={styles.coursesList}>
        {danceCourses.map((danceCourse, index) => {
          if (danceCourse.data.for === props.group) {
            return (
              <ClassSummary
                key={index}
                title={danceCourse.title}
                data={danceCourse.data}
                img={mapCourseToPhoto(danceCourse.title)}
              />
            );
          }
        })}
      </section>
    </div>
  );
};
