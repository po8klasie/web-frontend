import { stringify } from 'query-string';

export const createFiltersObjectWithoutDefaults = (
  filtersValues: Record<string, unknown>,
  defaultFiltersValues: Record<string, unknown>,
) => {
  return Object.fromEntries(
    Object.entries(filtersValues).filter(
      ([key, value]) => JSON.stringify(value) !== JSON.stringify(defaultFiltersValues[key]),
    ),
  );
};

export const stringifyQueryString = (objToStringify: Record<string, unknown>) =>
  stringify(objToStringify, {
    skipNull: true,
    skipFalse: false,
    skipEmptyString: true,
  });

export const stringifyMapPosition = (center: [number, number], zoom: number) =>
  stringifyQueryString({
    lat: center[0],
    lng: center[1],
    zoom,
  });
