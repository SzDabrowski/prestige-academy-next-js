import styles from "./CoursesContent.module.scss";
import { ClassSummary } from "@/components/ClassSummary/ClassSummary";
import danceCourses from "../../../../data/danceCourses.json";
import { courseForEnum } from "@/lib/enums";
import mapCourseToPhoto from "../../../../utils/coursePhotoMapper";
import { fetchDanceCoursesData } from "@/lib/contentful/serverActions/danceGroups";
import { draftMode } from "next/headers";
import { EntryCollection } from "contentful";
import { TypeDanceGroupSkeleton } from "@/types/typeDanceGroupsSkeleton";

interface iCoursesContent {
  group: string;
}

export const CoursesContent = async (props: iCoursesContent) => {
  const data = await fetchDanceCoursesData({
    preview: draftMode().isEnabled,
    targetGroup: props.group,
  });

  if (!data || !data.items || data.items.length === 0) {
    return <div>No courses available for this group.</div>;
  }
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
        {data.items!.map((item) => {
          const { title, summary, image } = item.fields;

          if (!image || !("fields" in image) || !image.fields.file) {
            return <main>Image data is not available</main>;
          }
          const { file } = image.fields;
          if (!file.url || !file.details || !file.details.image) {
            return <main>Invalid image data</main>;
          }
          return (
            <ClassSummary
              key={item.sys.space.sys.id}
              title={title}
              data={summary}
              img={file.url}
            />
          );
        })}
      </section>
    </div>
  );
};
