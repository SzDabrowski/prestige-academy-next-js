import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface typeListaSzkolEventyFields {
  list: {
    [preschoolName: string]: string[];
  };
}

export type typeListaSzkolEventySkeletop = EntrySkeletonType<
  typeListaSzkolEventyFields,
  "listaSzkolEventy"
>;

export type TypePreschoolsList<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<typeListaSzkolEventySkeletop, Modifiers, Locales>;
