import { useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  value: T,
  transform?: (value: T) => T
) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(transform?.(value) || value));
  }, [value]);
};
