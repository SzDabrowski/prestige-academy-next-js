import styles from "./CoursesContent.module.scss";
import { ClassSummary } from "@/components/ClassSummary/ClassSummary";
import { courseForEnum } from "@/lib/enums";
import { fetchDanceCoursesData } from "@/lib/contentful/serverActions/danceGroups";
import { Asset } from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import {
  TypeDanceGroupFields,
  TypeDanceGroupSkeleton,
} from "@/types/typeDanceGroupsSkeleton";
import { Entry } from "contentful";

interface iCoursesContent {
  group: string;
}

export const CoursesContent = async (props: iCoursesContent) => {
  // Fetching dance courses based on the target group
  const data = await fetchDanceCoursesData({
    preview: draftMode().isEnabled,
    targetGroup: props.group,
  });

  // Check if data is available
  if (!data || !data.items || data.items.length === 0) {
    return <div>No courses available for this group.</div>;
  }

  // Function to return appropriate group text
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
        <h1 className={styles.mainHeader}>Kursy</h1>
        <p>dla {returnGroupText(props.group)}</p>
      </section>
      <section className={styles.coursesList}>
        {data.items.map((item: Entry<TypeDanceGroupSkeleton>) => {
          const { title, summary, image, targetGroup, recruitmentOpen } =
            item.fields;

          // Render ClassSummary component
          return (
            <ClassSummary
              key={item.sys.id} // Using item.sys.id for a unique key
              title={String(title)}
              img={String(image.fields!.file.url)}
              summary={summary!}
              recruitment={recruitmentOpen}
              group={String(targetGroup)}
            />
          );
        })}
      </section>
    </div>
  );
};
