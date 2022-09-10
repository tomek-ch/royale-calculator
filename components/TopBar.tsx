import { ReactNode } from "react";
import { Transition } from "../hooks/useTransition";

interface BottomBarProps {
  children: ReactNode;
  transition: Transition;
}

export const TopBar = ({
  children,
  transition: { isExiting, isActive, finishExit },
}: BottomBarProps) => {
  console.log({ isExiting });

  if (!isActive) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div
        className={`
      bg-white py-2 shadow-lg fixed z-10
        top-0 w-full px-4
        md:rounded-md md:top-4 md:px-2 md:w-auto
        animate-slide-from-top ${isExiting ? "animate-slide-to-top" : ""}
        `}
        onAnimationEnd={({ animationName }) => {
          if (animationName === "slide-to-top") {
            finishExit();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};
