import { useState } from "react";
import { getFromStorage } from "../utils/getFromStorage";
import { useLocalStorage } from "./useLocalStorage";

export const useSyncedValue = <T>(
  storageKey: string,
  defaultValue: T,
  transform?: (value: T) => T
) => {
  const initial = getFromStorage(storageKey);
  const [value, setValue] = useState<T>(
    initial === undefined ? defaultValue : initial
  );
  useLocalStorage(storageKey, value, transform);
  return [value, setValue] as const;
};
