"use server";

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
	targetGroup: "dorosli" | "dzieci" | string;
}

export async function fetchDanceCoursesData({
	targetGroup,
	preview,
}: FetchDanceGroupDataOptions) {
	const contentful = contentfulClient({ preview });

	try {
		const response = await contentful.getEntries<TypeDanceGroupSkeleton>({
			content_type: "courseData",
			"fields.targetGroup": targetGroup,
			include: 2,
		});

		if (response.items.length === 0) {
			console.warn(`No course found with the title "${targetGroup}".`);
			return null;
		}

		if (!response) {
			throw new Error("No data");
		}
		const plainData = {
			items: response.items.map((item) => {
				// Get image URL safely
				const imageField = item.fields.image as any;
				const imageUrl = imageField?.fields?.file?.url || "";
				return {
					fields: {
						title: String(item.fields.title || ""),
						titleId: String(item.fields.titleId || ""),
						targetGroup: String(item.fields.targetGroup || ""),
						pairClass: Boolean(item.fields.pairClass),
						summary: String(item.fields.summary || ""),
						recruitmentOpen: Boolean(item.fields.recruitmentOpen),
						image: imageUrl
							? {
									fields: {
										file: {
											url: imageUrl,
										},
									},
								}
							: undefined,
					},
				};
			}),
			total: response.total,
			skip: response.skip,
			limit: response.limit,
		};

		return plainData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

interface fetchDanceGroupDataOptions {
	preview: boolean;
	danceGroupTitle: string;
}
export async function fetchDanceGroupData({
	danceGroupTitle,
	preview,
}: fetchDanceGroupDataOptions): Promise<TypeDanceGroupFields | null> {
	const contentful = contentfulClient({ preview });

	try {
		const response = await contentful.getEntries<TypeDanceGroupSkeleton>({
			content_type: "courseData",
			"fields.titleId": danceGroupTitle,
			include: 2,
		});

		if (response.items.length === 0) {
			console.warn(
				`No dance group found with the name : "${danceGroupTitle}".`
			);
			return null;
		}

		const entry = response.items[0];
		const { fields } = entry;

		if (!fields || fields === null) throw new Error("no data");

		return fields as unknown as TypeDanceGroupFields; // Cast fields to DanceGroupData
	} catch (error) {
		console.error(error);
		return null;
	}
}
