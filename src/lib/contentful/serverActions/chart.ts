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
      console.warn(`No chart data found.`);
      return null;
    }

    if (!response || response === null) {
      throw new Error("no data");
    }

    const plainData = {
      items: response.items.map((item) => {
        const fields = item.fields as any; // Type assertion for unknown structure

        return {
          fields: {
            title: String(fields.title || ""),

            ...Object.keys(fields).reduce((acc, key) => {
              try {
                acc[key] = JSON.parse(JSON.stringify(fields[key]));
              } catch (e) {
                acc[key] = fields[key];
              }
              return acc;
            }, {} as any),
          },
        };
      }),
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    };

    // Debug log to verify structure
    console.log(
      "Chart data - returning plain data:",
      JSON.stringify(plainData, null, 2)
    );

    return plainData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
