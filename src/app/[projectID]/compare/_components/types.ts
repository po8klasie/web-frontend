export type ComparisonResultT = 'match' | 'neutral' | 'different';

export interface ComparisonItemI<T> {
  value: T;
  comparisonResult: ComparisonResultT;
}

export interface ComparisonItemsSchemaI {
  isPublic: ComparisonItemI<boolean>;
  city: ComparisonItemI<string>;
  availableLanguages: ComparisonItemI<string>[];
  classes: ComparisonItemI<string>[];
}

export interface ComparisonInstitutionI {
  name: string;
  rspo: string;
  comparison: ComparisonItemsSchemaI;
}

export interface PropertiesMaxLengthsI {
  classes: number;
}
