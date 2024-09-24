import {
  TypeDanceGroupSkeleton,
  TypeDanceGroupFields,
} from "@/types/typeDanceGroupsSkeleton";
import { getStaticPropsUtil } from "@/lib/action";
import { getAllGrupyZaj, getGrupyZajById } from "@/lib/contentful/api";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "@/lib/contentful/client";
import { Entry, EntryCollection } from "contentful";
import { draftMode } from "next/headers";
interface FetchDanceGroupDataOptions {
  preview: boolean;
  targetGroup: string;
}

export async function fetchDanceCoursesData({
  targetGroup,
  preview,
}: FetchDanceGroupDataOptions) {
  const contentful = contentfulClient({ preview });

  try {
    const response = await contentful.getEntries<TypeDanceGroupSkeleton>({
      content_type: "courseData",
      'fields.targetGroup': targetGroup,
      include: 2,
    });

    if (response.items.length === 0) {
      console.warn(`No course found with the title "${targetGroup}".`);
      return null;
    }

    if (!response || response === null) new Error("no data");

    return response; // Return the fields of the single entry
  } catch (error) {
    console.error(error);
    return null;
  }
}
