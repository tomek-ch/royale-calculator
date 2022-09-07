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
      bg-white px-2 py-2 shadow-lg rounded-md fixed bottom-4 z-10
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
