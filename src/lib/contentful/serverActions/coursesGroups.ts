import {
  TypeCourseGroupFields,
  TypeCourseGroupSkeleton,
} from "@/types/typeCourseGroupSkeleton";
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

    return fields as unknown as TypeCourseGroupFields; // Return the fields of the single entry
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetContentfulDataProps {
  courseTitle: string;
}

export async function getContentfulData({
  courseTitle,
}: GetContentfulDataProps): Promise<{
  data: TypeCourseGroupFields | null;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
}> {
  const data = await fetchCourseData({
    preview: draftMode().isEnabled,
    courseTitle,
  });

  if (!data) {
    return {
      data: null,
      image: null,
    };
  }

  const { title, description, image } = data;

  // Check for image
  const imageField = image as any; // Adjust based on your actual types
  if (
    !imageField ||
    !imageField.fields ||
    !imageField.fields.file ||
    !imageField.fields.file.url
  ) {
    return { data: null, image: null };
  }

  const imageData = {
    url: imageField.fields.file.url,
    width: imageField.fields.file.details?.image?.width || 100,
    height: imageField.fields.file.details?.image?.height || 100,
  };

  return { data, image: imageData };
}
