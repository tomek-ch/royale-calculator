import { ReactNode } from "react";
import { Transition } from "../hooks/useTransition";

interface BottomBarProps {
  children: ReactNode;
  transition: Transition;
}

export const BottomBar = ({
  children,
  transition: { isExiting, isActive, finishExit },
}: BottomBarProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div
        className={`
      bg-white py-2 shadow-lg fixed z-10 dark:bg-slate-700
        bottom-0 w-full px-4
        md:rounded-md md:bottom-4 md:px-2 md:w-auto
        animate-slide-up ${isExiting ? "animate-slide-down" : ""}
        `}
        onAnimationEnd={({ animationName }) => {
          if (animationName === "slide-down") {
            finishExit();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};
