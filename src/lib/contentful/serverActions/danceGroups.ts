import { TypeDanceGroupSkeleton } from "@/types/typeDanceGroupsSkeleton";
import { getStaticPropsUtil } from "@/lib/action";
import { getAllGrupyZaj, getGrupyZajById } from "@/lib/contentful/api";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "@/lib/contentful/client";
import { Entry } from "contentful";
import { draftMode } from "next/headers";

type DataEntry = Entry<TypeDanceGroupSkeleton, undefined, string>;

export interface DanceGroupData {
  title: string;
  description: RichTextDocument | undefined;
}

function parseContentfulData(dataEntry?: DataEntry): DanceGroupData | null {
  if (!dataEntry) {
    return null;
  }

  return {
    title: dataEntry.fields.title || "",
    description: dataEntry.fields.description,
  };
}

interface FetchDanceGroupsDataOptions {
  preview: boolean;
}

// export async function fetchDanceGroupsData({
//   preview,
// }: FetchDanceGroupsDataOptions): Promise<DanceGroupData[]> {
//   const contentful = contentfulClient({ preview });

//   const danceGroupsResult = await contentful.getEntries<TypeDanceGroupSkeleton>(
//     {
//       content_type: "danceGroupData", // Updated content type ID
//       include: 2,
//       order: ["fields.title"],
//     }
//   );

//   return danceGroupsResult.items.map(
//     (danceGroupEntry) => parseContentfulData(danceGroupEntry) as DanceGroupData
//   );
// }

interface FetchDanceGroupDataOptions {
  preview: boolean;
  danceGroupTitle: string;
}

export async function fetchDanceGroupData({
  danceGroupTitle,
  preview,
}: FetchDanceGroupDataOptions): Promise<DanceGroupData | null> {
  const contentful = contentfulClient({ preview });

  const danceGroupsResult = await contentful.getEntries<TypeDanceGroupSkeleton>(
    {
      content_type: "courseData", // Updated content type ID
      "fields.title": danceGroupTitle,
      include: 2,
    }
  );

  return parseContentfulData(danceGroupsResult.items[0]);
}
