import { parse } from 'query-string';
import * as yup from 'yup';
import { availableExtendedSubjects } from './apiDataMapping';
import { availableRspoInstitutionTypeIds } from '../app/[projectID]/map/(filters)/@institutionTypeFilter/page';
import { FilterDefinition } from '../api/projectConfig/types';

const extendedSubjectsSchema = yup
  .array()
  .of(yup.array().of(yup.string().oneOf(availableExtendedSubjects)));

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
  rspoInstitutionTypeId: (value: unknown) => {
    let valueArr = value;
    if (!Array.isArray(valueArr)) valueArr = [valueArr];
    const availableInstitutionTypesSet = new Set(availableRspoInstitutionTypeIds);
    (valueArr as unknown[]).forEach((x: unknown) => {
      if (!availableInstitutionTypesSet.has(x as string)) throw new Error("Can't transform");
    });
    return valueArr;
  },
  extendedSubjects: (value: unknown) => {
    extendedSubjectsSchema.validateSync(JSON.parse(value as string));
    return value;
  },
} as const;

export type AnyParser = keyof typeof parsers;

const parseQS = (asPath: string) => parse(new URL(`http://example.com${asPath}`).search);

export const parseQueryFromURL = (asPath: string) => {
  const rawQueryData = parseQS(asPath);
  const query = rawQueryData.query && rawQueryData.query.length > 0 ? rawQueryData.query : '';
  return query;
};

export const parseMapPositionFromURL = (asPath: string) => {
  let hash = new URL(`http://example.com${asPath}`).hash;
  if (hash) hash = hash.substring(1);
  const rawQueryData = parse(hash);
  const areHashParamsOk = [rawQueryData.lat, rawQueryData.lng, rawQueryData.zoom].every(
    (n) => n && !Number.isNaN(n),
  );

  if (!areHashParamsOk) return null;

  return {
    center: [parseFloat(rawQueryData.lat), parseFloat(rawQueryData.lng)],
    zoom: parseInt(rawQueryData.zoom, 10),
  };
};

export const parseFiltersFromUrl = (asPath: string, filterDefinitions: FilterDefinition[]) => {
  const rawQueryData = parseQS(asPath);
  const keysInQuery = Object.keys(rawQueryData);
  const parsedFilters = {};

  filterDefinitions.forEach(({ name, parser: parserId }) => {
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
