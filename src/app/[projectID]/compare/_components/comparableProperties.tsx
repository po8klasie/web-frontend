import { ComparisonListItem } from './ComparisonList';
import React, { ReactNode } from 'react';
import { ComparisonItemI, ComparisonItemsSchemaI, PropertiesMaxLengthsI } from './types';

export interface ComparablePropertiesSectionI {
  sectionName: string;
  getBlankItemsNo?: (
    comparisonItems: ComparisonItemsSchemaI,
    propertiesMaxLengths: PropertiesMaxLengthsI,
  ) => number;
  renderComparisonListContents: (comparisonItems: ComparisonItemsSchemaI) => ReactNode;
}

const renderComparisonListItemsFromArray = <T extends string>(arr: ComparisonItemI<T>[]) => (
  <>
    {arr.map(({ value, comparisonResult }) => (
      <ComparisonListItem key={value} state={comparisonResult}>
        {value}
      </ComparisonListItem>
    ))}
  </>
);

const comparableProperties: ComparablePropertiesSectionI[] = [
  {
    sectionName: 'Ogólne informacje',
    renderComparisonListContents: ({ isPublic, city }) => (
      <>
        <ComparisonListItem state={isPublic.comparisonResult}>
          {isPublic.value ? 'Szkoła publiczna' : 'Szkoła niepubliczna'}
        </ComparisonListItem>
        <ComparisonListItem state={city.comparisonResult}>{city.value}</ComparisonListItem>
      </>
    ),
  },
  // {
  //   sectionName: 'Profile klas 2022/2023',
  //   getBlankItemsNo: ({ classes }, { classes: classesMaxLen }) => classesMaxLen - classes.length,
  //   renderComparisonListContents: ({ classes }) =>
  //     renderComparisonListItemsFromArray<string>(classes),
  // },
  // {
  //   sectionName: 'Języki',
  //   renderComparisonListContents: ({ availableLanguages }) =>
  //     renderComparisonListItemsFromArray<string>(availableLanguages),
  // },
];

export default comparableProperties;
