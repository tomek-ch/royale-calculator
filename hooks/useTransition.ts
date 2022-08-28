import { useState } from "react";
import { flushSync } from "react-dom";

export const useTransition = ({ onClose } = { onClose: () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      onClose();
    });
  };

  return { isOpen, isExiting, toggle, finishExit };
};
