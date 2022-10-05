import { isClient } from "./isServer";

let topOffset = isClient ? document.documentElement.scrollTop : 0;

export const disableScroll = () => {
  if (document.body.dataset.isScrollDisabled) return;
  topOffset = document.documentElement.scrollTop;
  document.body.style.top = `-${topOffset}px`;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.overflowY = "scroll";
  document.body.dataset.isScrollDisabled = "yes";
};

export const enableScroll = () => {
  document.body.style.removeProperty("top");
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("width");
  document.body.style.removeProperty("overflow-y");

  document.documentElement.style.scrollBehavior = "auto";
  document.documentElement.scrollTop = topOffset;
  document.documentElement.style.removeProperty("scroll-behavior");
  document.body.style.removeProperty("top");
};
