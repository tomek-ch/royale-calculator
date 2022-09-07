import { useState } from "react";
import { flushSync } from "react-dom";

export const useTransition = ({
  onClose,
  onOpen,
}: {
  onOpen?: () => void;
  onClose?: () => void;
} = {}) => {
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const open = () => {
    onOpen?.();
    setIsActive(true);
  };

  const toggle = () => {
    if (isActive) {
      setIsExiting(true);
    } else {
      open();
    }
  };

  const set = (value: boolean) => {
    if (value) {
      open();
    } else if (isActive) {
      setIsExiting(true);
    }
  };

  const finishExit = () => {
    flushSync(() => {
      setIsExiting(false);
      setIsActive(false);
      onClose?.();
    });
  };

  return { isActive, isExiting, toggle, finishExit, set };
};

export type Transition = ReturnType<typeof useTransition>;
