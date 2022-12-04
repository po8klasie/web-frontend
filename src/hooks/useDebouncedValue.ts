import { useEffect, useRef, useState } from 'react';

const useDebouncedValue = <T>(value: T, delay: number): T => {
  const debouncedValue = useRef<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedValue.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue.current;
};

export default useDebouncedValue;
