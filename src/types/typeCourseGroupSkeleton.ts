import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeCourseGroupFields {
  title: EntryFieldTypes.Symbol;
  image: EntryFieldTypes.AssetLink;
  description?: EntryFieldTypes.RichText;
}

export type TypeCourseGroupSkeleton = EntrySkeletonType<
  TypeCourseGroupFields,
  "grupyZaj"
>;

export type TypeCourseGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeCourseGroupSkeleton, Modifiers, Locales>;
