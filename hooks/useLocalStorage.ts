import { useEffect } from "react";

export const useLocalStorage = <T>(key: string, value: T) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
};
