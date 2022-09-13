import { ReactNode } from "react";
import { CircleCheck } from "./icons/CircleCheck";
import { Info } from "./icons/Info";
import { Warning } from "./icons/Warning";

interface InlineAlertProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}

const variants = {
  danger: "text-red-600",
  warning: "text-amber-600",
  info: "text-slate-600",
  success: "text-green-700",
};

const icons = {
  danger: <Warning width="16" />,
  warning: <Warning width="16" />,
  success: <CircleCheck width="16" />,
  info: <Info width="16" />,
};

export const InlineAlert = ({
  children,
  className = "",
  variant = "info",
}: InlineAlertProps) => {
  if (children) {
    return (
      <div
        className={` flex gap-2 items-center ${className} ${variants[variant]}`}
      >
        {icons[variant]}
        {children}
      </div>
    );
  }
  return null;
};
