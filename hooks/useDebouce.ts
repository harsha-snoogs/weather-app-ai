import { useEffect, useState } from "react";

export default function useDebouce<T>(value: T, delay: number) {
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return deboucedValue;
}
