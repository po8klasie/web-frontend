import { xor } from 'lodash';

export const removeFromArray = <T>(arr: T[], elementToRemove: T) =>
  arr.filter((x: T) => x !== elementToRemove);

export const toggleElementInArray = <T>(arr: T[], element: T, totalLength?: number) => {
  const newArray = xor(arr, [element]);
  if (!totalLength) return newArray;

  return newArray.length === totalLength ? [] : newArray;
};

export const removeFromObject = (obj: Record<string, unknown>, keys: string[]) => {
  const clonedObj = { ...obj };
  keys.forEach((key) => delete clonedObj[key]);
  return clonedObj;
};
