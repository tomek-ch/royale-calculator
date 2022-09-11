import { useState } from "react";
import { flushSync } from "react-dom";
import { callMaybeFunction } from "../utils/callMaybeFunction";

export const useTransition = ({
  onClose,
  onOpen,
}: {
  onOpen?: () => void;
  onClose?: () => void;
} = {}) => {
  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [onToggle, setOnToggle] = useState<(() => void) | null>(null);

  const open = () => {
    onOpen?.();
    setIsActive(true);
  };

  const toggle = (cb?: () => void) => {
    if (isActive) {
      setIsExiting(true);
      setOnToggle(cb ? () => cb : null);
    } else {
      open();
      callMaybeFunction(cb);
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

      callMaybeFunction(onToggle);
      setOnToggle(null);
    });
  };

  return { isActive, isExiting, toggle, finishExit, set };
};

export type Transition = ReturnType<typeof useTransition>;
