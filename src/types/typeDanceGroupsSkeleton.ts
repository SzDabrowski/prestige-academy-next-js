import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeDanceGroupFields {
  targetGroup: EntryFieldTypes.Text;
  title: string;
  image: EntryFieldTypes.AssetLink;
  pairClass: boolean;
  summary?: string;
  description: EntryFieldTypes.RichText;
  recruitmentOpen: boolean;
  dateOfFirstClasses?: string;
  price?: string;
  location?: string;
  classesTimeInformation: EntryFieldTypes.RichText;
}

// Define the skeleton for the DanceGroupData content type
export type TypeDanceGroupSkeleton = EntrySkeletonType<
  TypeDanceGroupFields,
  "courseData"
>;

// Define the main DanceGroupData type with optional chain modifiers and locale
export type TypeDanceGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeDanceGroupSkeleton, Modifiers, Locales>;
