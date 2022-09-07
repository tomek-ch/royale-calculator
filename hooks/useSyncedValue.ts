import { useState } from "react";
import { getFromStorage } from "../utils/getFromStorage";
import { useLocalStorage } from "./useLocalStorage";

export const useSyncedValue = <T>(
  storageKey: string,
  defaultValue: T,
  transform?: (value: T) => T
) => {
  const [value, setValue] = useState<T>(
    getFromStorage(storageKey) || defaultValue
  );
  useLocalStorage(storageKey, value, transform);
  return [value, setValue] as const;
};
