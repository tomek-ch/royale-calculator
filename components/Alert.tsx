import { ReactNode } from "react";
import { Info } from "./icons/Info";

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export const Alert = ({ children, className = "" }: AlertProps) => {
  return (
    <div
      className={`rounded-md bg-slate-200 text-slate-600 p-4 flex gap-2
    dark:bg-slate-800 dark:text-slate-300 ${className}`}
    >
      <Info width="20" className="text-slate-500" />
      {children}
    </div>
  );
};
