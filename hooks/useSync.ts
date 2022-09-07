import { useEffect } from "react";

export const useSync = <T>(value: T, sync: (value: T) => void) => {
  useEffect(() => {
    sync(value);
  }, [value]);
};
