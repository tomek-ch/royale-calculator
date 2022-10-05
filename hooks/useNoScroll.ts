import { useRef, useEffect } from "react";
import { isClient } from "../utils/isServer";

let id = 0;
const getId = () => (++id).toString();

export const useNoScroll = (isDisabled: boolean) => {
  const topOffset = useRef(isClient ? document.documentElement.scrollTop : 0);
  const id = useRef(getId());

  useEffect(() => {
    if (isDisabled) {
      topOffset.current = document.documentElement.scrollTop;
      document.body.style.top = `-${topOffset.current}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
      document.body.dataset.noScrollId = id.current;
    } else if (document.body.dataset.noScrollId === id.current) {
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("overflow-y");

      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.scrollTop = topOffset.current;
      document.documentElement.style.removeProperty("scroll-behavior");
      document.body.style.removeProperty("top");
    }
  }, [isDisabled, topOffset, id]);
};
