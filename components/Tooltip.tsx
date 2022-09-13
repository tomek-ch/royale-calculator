import { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  title: string;
}

export const Tooltip = ({ children, title }: TooltipProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div
        className={`
        absolute bottom-[calc(100%+0.25rem)] bg-black/70 text-white py-1 px-2 rounded-md
        whitespace-nowrap left-1/2 -translate-x-1/2 hidden ${
          isActive ? "md:block" : ""
        }`}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
