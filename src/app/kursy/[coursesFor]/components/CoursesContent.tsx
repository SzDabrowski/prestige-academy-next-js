import styles from "./CoursesContent.module.scss";
import { ClassSummary } from "@/components/ClassSummary/ClassSummary";
import { courseForEnum } from "@/lib/enums";
import { fetchDanceCoursesData } from "@/lib/contentful/serverActions/danceGroups";
import { draftMode } from "next/headers";
import { TypeDanceGroupSkeleton } from "@/types/typeDanceGroupsSkeleton";
import { Entry, Asset } from "contentful";

interface CoursesContentProps {
  group: string;
}

type ImageField = {
  fields?: {
    file?: {
      url?: string;
    };
  };
};

export const CoursesContent = async ({ group }: CoursesContentProps) => {
  const data = await fetchDanceCoursesData({
    preview: draftMode().isEnabled,
    targetGroup: group,
  });

  if (!data?.items?.length) {
    return <div>No courses available for this group.</div>;
  }

  const groupText = group === courseForEnum.adults ? "dorosłych" : "dzieci";

  return (
    <div className={styles.contentContainer}>
      <section className={styles.heading}>
        <h1 className={styles.mainHeader}>Kursy</h1>
        <p>dla {groupText}</p>
      </section>
      <section className={styles.coursesList}>
        {data.items.map((item: Entry<TypeDanceGroupSkeleton>) => {
          const image = item.fields.image as unknown as ImageField;
          return (
            <ClassSummary
              key={item.sys.id}
              title={String(item.fields.title) || ""}
              img={String(image?.fields?.file?.url) || ""}
              summary={String(item.fields.summary) || ""}
              recruitment={Boolean(item.fields.recruitmentOpen) ?? false}
              group={String(item.fields.targetGroup) || ""}
            />
          );
        })}
      </section>
    </div>
  );
};
