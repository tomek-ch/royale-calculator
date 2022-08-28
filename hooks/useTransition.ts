import { useState } from "react";
import { flushSync } from "react-dom";

export const useTransition = ({ onClose } = { onClose: () => {} }) => {
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const toggle = () => {
    if (isActive) {
      setIsExiting(true);
    } else {
      setIsActive(true);
    }
  };

  const finishExit = () => {
    flushSync(() => {
      setIsExiting(false);
      setIsActive(false);
      onClose();
    });
  };

  return { isActive, isExiting, toggle, finishExit };
};
