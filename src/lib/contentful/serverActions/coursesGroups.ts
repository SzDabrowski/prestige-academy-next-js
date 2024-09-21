import { TypeCourseGroupSkeleton } from "@/types/typeCourseGroupSkeleton";
import { getStaticPropsUtil } from "@/lib/action";
import { getAllGrupyZaj, getGrupyZajById } from "@/lib/contentful/api";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "@/lib/contentful/client";
import { Entry } from "contentful";
import { draftMode } from "next/headers";
import { error } from "console";

type DataEntry = Entry<TypeCourseGroupSkeleton, undefined, string>;

export interface CourseData {
  title: string;
  description: RichTextDocument | undefined;
}

function parseContentfulData(dataEntry?: DataEntry): CourseData | null {
  if (!dataEntry) {
    return null;
  }

  return {
    title: dataEntry.fields.title || "",
    description: dataEntry.fields.description,
  };
}

interface fetchCoursesDataOptions {
  preview: boolean;
}
export async function fetchCoursesData({ preview }: fetchCoursesDataOptions) {
  const contentful = contentfulClient({ preview });
  let entries: any[] = [];

  try {
    const blogPostsResult = await contentful.getEntries({
      content_type: "grupyZaj",
    });
    entries = blogPostsResult.items.map((entry) => {
      const { fields } = entry;
      return fields; // Push entire fields object
    });
  } catch (error) {
    console.error(error);
  }

  return entries;
}

interface fetchCourseDataOptions {
  preview: boolean;
  courseTitle: string;
}
export async function fetchCourseData({
  courseTitle,
  preview,
}: fetchCourseDataOptions) {
  const contentful = contentfulClient({ preview });

  try {
    const response = await contentful.getEntries<TypeCourseGroupSkeleton>({
      content_type: "grupyZaj",
      "fields.title": courseTitle,
      include: 2,
    });

    if (response.items.length === 0) {
      console.warn(`No course found with the title "${courseTitle}".`);
      return null;
    }

    const entry = response.items[0];
    const { fields } = entry;

    if (!fields || fields === null) new Error("no data");

    return fields; // Return the fields of the single entry
  } catch (error) {
    console.error(error);
    return null;
  }
}
