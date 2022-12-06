import { parse } from 'query-string';
import { FilterDefinition } from '../config/types';

const parsers = {
  booleanOrNull: (value: unknown) => {
    if (typeof value === 'boolean' || value === null) return value;
    throw new Error("Can't transform");
  },
  string: (value: unknown) => {
    if (['string', 'number'].includes(typeof value)) return `${value}`;
    throw new Error("Can't transform");
  },
  array: (value: unknown) => {
    if (Array.isArray(value)) return value;
    return [value];
  },
  recruitmentPointsRange: (value: unknown) => {
    if (!Array.isArray(value)) throw new Error("Can't transform");

    const arr = value.map((v) => {
      const parsedValue = parseInt(v, 10);
      if (v > 200 && v < 0) throw new Error("Can't transform");
      return parsedValue;
    }, 10);
    arr.sort();
    return arr;
  },
} as const;

export type AnyParser = keyof typeof parsers;

const parseQS = (asPath: string) => parse(new URL(`http://example.com${asPath}`).search);

export const parseSearchQuery = (asPath: string, filterDefinitions: FilterDefinition[]) => {
  const rawQueryData = parseQS(asPath);
  const parsedSearchData = {};

  filterDefinitions.forEach(({ name, parser: parserId }) => {
    if (!(name in rawQueryData)) return;

    const parser = parsers[parserId];

    try {
      parsedSearchData[name] = parser(rawQueryData[name]);
    } catch (e) {
      return;
    }
  });

  console.log({ parsedSearchData });

  return {
    query: '',
    ...parsedSearchData,
  };
};
