import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

// Define the fields for the "Grupy Zajęć" content type
export interface TypeDanceGroupFields {
  title: EntryFieldTypes.Symbol; // Required Symbol field
  image: EntryFieldTypes.AssetLink; // Required Link to Asset
  description?: EntryFieldTypes.RichText; // Optional RichText field
}

// Define the skeleton type for the "Grupy Zajęć" content type
export type TypeDanceGroupSkeleton = EntrySkeletonType<
  TypeDanceGroupFields,
  "grupyZaj"
>;

// Define the complete entry type for the "Grupy Zajęć" content type
export type TypeDanceGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeDanceGroupSkeleton, Modifiers, Locales>;
