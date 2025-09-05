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

type PlainChartEntry = { fields: Record<string, unknown> & { title: string } };
type PlainChartData = {
	items: PlainChartEntry[];
	total: number;
	skip: number;
	limit: number;
};

export async function fetchChartData({
	preview,
}: chartDataOptions): Promise<PlainChartData | null> {
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

		const plainData: PlainChartData = {
			items: response.items.map((item) => {
				const fields = item.fields as Record<string, unknown>;

				return {
					fields: {
						...Object.keys(fields).reduce((acc, key) => {
							if (key === "title") return acc;
							try {
								acc[key] = JSON.parse(JSON.stringify((fields as any)[key]));
							} catch (e) {
								acc[key] = (fields as any)[key];
							}
							return acc;
						}, {} as any),
						title: String((fields as any)?.title ?? ""),
					},
				};
			}),
			total: response.total,
			skip: response.skip,
			limit: response.limit,
		};

		// Debug log to verify structure
		// console.log(
		// 	"Chart data - returning plain data:",
		// 	JSON.stringify(plainData, null, 2)
		// );

		return plainData;
	} catch (error) {
		console.error(error);
		return null;
	}
}
