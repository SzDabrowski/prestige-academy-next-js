import type {
  ChainModifiers,
  Entry,
  Asset,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface TypeCourseGroupFields {
  title: EntryFieldTypes.Text;
  image: Asset;
  description?: Document;
}

export type TypeCourseGroupSkeleton = EntrySkeletonType<
  TypeCourseGroupFields,
  "grupyZaj"
>;

export type TypeCourseGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeCourseGroupSkeleton, Modifiers, Locales>;
