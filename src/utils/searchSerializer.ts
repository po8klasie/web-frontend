import { FormState } from 'react-hook-form';
import { stringify } from 'query-string';
export const serializeSearchData = (
  filtersValues: Record<string, any>,
  defaultFiltersValues: Record<string, any>,
  additionalDataToSerialize: Record<string, unknown> = {},
) => {
  let objToStringify = Object.fromEntries(
    Object.entries(filtersValues).filter(
      ([key, value]) => JSON.stringify(value) !== JSON.stringify(defaultFiltersValues[key]),
    ),
  );

  if (Object.keys(additionalDataToSerialize))
    objToStringify = {
      ...objToStringify,
      ...additionalDataToSerialize,
    };

  return stringify(objToStringify, {
    skipNull: true,
    skipFalse: false,
    skipEmptyString: true,
  });
};
