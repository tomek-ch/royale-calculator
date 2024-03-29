import { ReactNode } from "react";
import { useTransition } from "../hooks/useTransition";

interface TooltipProps {
  children: ReactNode;
  title: string;
  position?: "top" | "bottom";
  className?: string;
}

export const Tooltip = ({
  children,
  title,
  position = "top",
  className = "",
}: TooltipProps) => {
  const { isActive, isExiting, finishExit, set } = useTransition();
  return (
    <div
      className="relative"
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
    >
      <div
        className={`
        absolute bg-black/80 text-white py-1 px-2 rounded-md
        left-1/2 -translate-x-1/2 ${className} z-10
        ${
          position === "top"
            ? "bottom-[calc(100%+0.25rem)]"
            : "top-[calc(100%+0.25rem)]"
        }
        ${isActive ? "block" : "!hidden"} ${
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
