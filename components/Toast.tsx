import { ReactNode } from "react";
import { Transition } from "../hooks/useTransition";

interface ToastProps {
  children: ReactNode;
  transition: Transition;
}

export const Toast = ({
  children,
  transition: { isActive, isExiting, finishExit },
}: ToastProps) => {
  if (!isActive) {
    return null;
  }
  return (
    <div
      className={`
      fixed bottom-4 bg-black/80 text-white py-2 px-4 rounded-md
      left-1/2 -translate-x-1/2 ${
        isExiting ? "animate-fade-out" : "animate-fade-in"
      }`}
      onAnimationEnd={({ animationName }) => {
        if (animationName === "fade-out") {
          finishExit();
        }
      }}
    >
      {children}
    </div>
  );
};
