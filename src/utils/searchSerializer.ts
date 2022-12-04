import { FormState } from 'react-hook-form';
import { stringify } from 'query-string';

const isNonEmptyValue = (val: unknown): boolean =>
  Boolean(val || (Array.isArray(val) && val.length > 0));

export const serializeSearchData = (
  filtersFormValues: Record<string, any>,
  filtersFormState: FormState<any>,
  additionalDataToSerialize: Record<string, unknown> = {},
) => {
  const dirtyFields = Object.entries(filtersFormState.dirtyFields ?? {}).reduce(
    (arr, [key, isDirty]) => {
      if (isDirty) return [...arr, key];
      return arr;
    },
    [] as string[],
  );

  let objToStringify = Object.fromEntries(
    Object.entries(filtersFormValues).filter(
      ([key, value]) => dirtyFields.includes(key) && isNonEmptyValue(value),
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
