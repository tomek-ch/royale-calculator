import { ReactNode } from "react";
import { Warning } from "./icons/Warning";

interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

export const ErrorMessage = ({
  children,
  className = "",
}: ErrorMessageProps) => {
  if (children) {
    return (
      <div className={`text-red-600 flex gap-2 items-baseline ${className}`}>
        <Warning width={16} />
        {children}
      </div>
    );
  }
  return null;
};
