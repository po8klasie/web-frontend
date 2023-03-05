import { useEffect, useState, useRef } from 'react';

function useDebouncedValue<T = unknown>(value: T, wait: number, options = { leading: false }) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number>(null);
  const cooldownRef = useRef(false);

  const cancel = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
}

export default useDebouncedValue;
