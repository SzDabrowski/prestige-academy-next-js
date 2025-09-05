import type {
	Asset,
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface TypeChartFields {
	grafik?: Asset;
}

export type TypeChartSkeleton = EntrySkeletonType<TypeChartFields, "grafik">;

export type TypeChart<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode,
> = Entry<TypeChartSkeleton, Modifiers, Locales>;
