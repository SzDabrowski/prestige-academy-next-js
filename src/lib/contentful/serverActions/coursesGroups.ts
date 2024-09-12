import { TypeDanceGroupSkeleton } from "@/types/typeCourseGroupSkeleton";
import { getStaticPropsUtil } from "@/lib/action";
import { getAllGrupyZaj, getGrupyZajById } from "@/lib/contentful/api";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "@/lib/contentful/client";
import { Entry } from "contentful";
import { draftMode } from "next/headers";

type DataEntry = Entry<TypeDanceGroupSkeleton, undefined, string>;

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
export async function fetchCoursesData({
  preview,
}: fetchCoursesDataOptions): Promise<CourseData[]> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypeDanceGroupSkeleton>({
    content_type: "grupyZaj",
    include: 2,
    order: ["fields.title"],
  });

  return blogPostsResult.items.map(
    (blogPostEntry) => parseContentfulData(blogPostEntry) as CourseData
  );
}

interface fetchCourseDataOptions {
  preview: boolean;
  courseTitle: string;
}
export async function fetchCourseData({
  courseTitle,
  preview,
}: fetchCourseDataOptions): Promise<CourseData | null> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypeDanceGroupSkeleton>({
    content_type: "grupyZaj",
    "fields.title": courseTitle,
    include: 2,
  });

  return parseContentfulData(blogPostsResult.items[0]);
}
