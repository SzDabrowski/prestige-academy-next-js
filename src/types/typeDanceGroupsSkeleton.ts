import type {
  Asset,
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface TypeDanceGroupFields {
  targetGroup: EntryFieldTypes.Text;
  title: EntryFieldTypes.Text;
  titleId: EntryFieldTypes.Text;
  signUpTitle: EntryFieldTypes.Text;
  image: Asset;
  pairClass: boolean;
  summary?: string;
  description: Document;
  recruitmentOpen: boolean;
  dateOfFirstClasses?: string;
  price?: string;
  location?: string;
  classesTimeInformation: Document;
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
