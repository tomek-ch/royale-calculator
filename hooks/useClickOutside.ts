import { RefObject } from "react";
import { useEventListener } from "./useEventListener";

export const useClickOutside = (
  refs: RefObject<(HTMLElement | null) | (HTMLElement | null)[]>[],
  onClickOutside: () => void,
  enabled: boolean
) => {
  const handleClickOutside = (e: Event) => {
    const isOutsideItems = refs
      .flatMap(({ current }) => current)
      .every((element) => !element?.contains(e.target as Node));

    if (isOutsideItems) {
      onClickOutside();
    }
  };

  useEventListener(document, "click", handleClickOutside, enabled, refs);
};
