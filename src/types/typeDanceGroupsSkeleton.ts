import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeDanceGroupFields {
  title: EntryFieldTypes.Symbol; // Symbol for title (required)
  image?: EntryFieldTypes.AssetLink; // Optional link to asset (image)
  targetGroup: EntryFieldTypes.Symbol; // Symbol for targetGroup (required)
  pairClass: EntryFieldTypes.Boolean; // Boolean field to check if the class is for pairs
  summary?: EntryFieldTypes.Symbol; // Optional summary
  description: EntryFieldTypes.RichText; // RichText for description (required)
  recruitmentOpen?: EntryFieldTypes.Boolean; // Optional Boolean to indicate if recruitment is open
  dateOfFirstClasses?: EntryFieldTypes.Symbol; // Optional date of first classes
  price?: EntryFieldTypes.Symbol; // Optional price information
  location?: EntryFieldTypes.Symbol; // Optional location of the classes
  classesTimeInformation: EntryFieldTypes.RichText; // RichText for classes time information (required)
}

// Define the skeleton for the DanceGroupData content type
export type TypeDanceGroupSkeleton = EntrySkeletonType<
  TypeDanceGroupFields,
  "courseData"
>;

// Define the main DanceGroupData type with optional chain modifiers and locale
export type TypeDanceGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeDanceGroupSkeleton, Modifiers, Locales>;
