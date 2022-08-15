import { useState } from "react";
import { flushSync } from "react-dom";

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [isExiting, setIsExiting] = useState(false);

  const toggle = () => {
    if (isOpen) {
      setIsExiting(true);
    } else {
      setIsOpen(true);
    }
  };

  const finishExit = () => {
    flushSync(() => {
      setIsExiting(false);
      setIsOpen(false);
    });
  };

  return { isOpen, isExiting, toggle, finishExit };
};
