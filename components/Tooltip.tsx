import { ReactNode, useState } from "react";
import { useTransition } from "../hooks/useTransition";

interface TooltipProps {
  children: ReactNode;
  title: string;
}

export const Tooltip = ({ children, title }: TooltipProps) => {
  const { isActive, isExiting, finishExit, set } = useTransition();
  return (
    <div onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>
      <div
        className={`
        absolute bottom-[calc(100%+0.25rem)] bg-black/70 text-white py-1 px-2 rounded-md
        whitespace-nowrap left-1/2 -translate-x-1/2 hidden
        ${isActive ? "md:block" : ""} ${
          isExiting ? "animate-fade-out" : "animate-fade-in"
        }`}
        onAnimationEnd={({ animationName }) => {
          if (animationName === "fade-out") {
            finishExit();
          }
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
