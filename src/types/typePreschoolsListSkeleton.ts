import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypePreschoolsListFields {
  title: EntryFieldTypes.Text;
  preschoolName: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypePreschoolsListSkeleton = EntrySkeletonType<
  TypePreschoolsListFields,
  "przedszkola"
>;

export type TypePreschoolsList<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypePreschoolsListSkeleton, Modifiers, Locales>;
