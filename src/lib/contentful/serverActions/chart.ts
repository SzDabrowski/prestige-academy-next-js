"use server";

import { getStaticPropsUtil } from "@/lib/action";
import { stringify } from "querystring";
import { ContentfulEntry, getContent } from "@/lib/contentful/client";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "@/lib/contentful/client";
import { Entry, EntryCollection } from "contentful";
import { TypeChartSkeleton } from "@/types/typeChartSkeleton";

import { draftMode } from "next/headers";

interface chartDataOptions {
  preview: boolean;
}

export async function fetchChartData({ preview }: chartDataOptions) {
  const contentful = contentfulClient({ preview });

  try {
    const response = await contentful.getEntries<TypeChartSkeleton>({
      content_type: "grafik",
      include: 1,
    });

    if (response.items.length === 0) {
      console.warn(`No chart data".`);
      return null;
    }

    if (!response || response === null) new Error("no data");

    return response; // Return the fields of the single entry
  } catch (error) {
    console.error(error);
    return null;
  }
}
