import { useEffect } from "react";

export const useEventListener = (
  element: {
    addEventListener(eventType: string, listener: (e: Event) => void): void;
    removeEventListener(eventType: string, listener: (e: Event) => void): void;
  },
  eventType: string,
  listener: (e: Event) => void,
  enabled: boolean,
  dependencyList: unknown[] = []
) => {
  useEffect(() => {
    const unsubscribe = () => element.removeEventListener(eventType, listener);

    if (enabled) {
      element.addEventListener(eventType, listener);
    } else {
      unsubscribe();
    }

    return unsubscribe;
  }, [enabled, ...dependencyList]);
};
