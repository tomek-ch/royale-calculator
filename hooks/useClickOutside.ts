import { useEffect } from "react";

export const useClickOutside = (
  [isActive, toggle]: [boolean, () => void],
  element: HTMLElement | null
) => {
  const handleClickOutside = (event: Event) => {
    if (!element?.contains(event.target as Node)) {
      toggle();
    }
  };

  useEffect(() => {
    const unsubscribe = () =>
      document.removeEventListener("click", handleClickOutside);

    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      unsubscribe();
    }

    return unsubscribe;
  }, [isActive]);
};
