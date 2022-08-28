import { useEffect } from "react";

export const useLocalStorage = <T>(key: string, value: T, enabled: boolean) => {
  useEffect(() => {
    if (enabled) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, enabled]);
};
