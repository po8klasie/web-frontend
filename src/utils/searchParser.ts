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

export const parseQueryFromURL = (asPath: string) => {
  const rawQueryData = parseQS(asPath);
  const query = rawQueryData.query && rawQueryData.query.length > 0 ? rawQueryData.query : '';
  return query;
};

export const parseFiltersFromUrl = (asPath: string, filterDefinitions: FilterDefinition[]) => {
  const rawQueryData = parseQS(asPath);
  const keysInQuery = Object.keys(rawQueryData);
  const parsedFilters = {};

  filterDefinitions.forEach(({ name, parser: parserId, defaultValue }) => {
    if (!keysInQuery.includes(name)) return;

    console.log({ name });

    const parser = parsers[parserId];

    try {
      const parsedData = parser(rawQueryData[name]);

      parsedFilters[name] = parsedData;
    } catch (e) {
      return;
    }
  });

  return parsedFilters;
};
