import { ReactNode } from "react";
import { Info } from "./icons/Info";

interface AlertProps {
  children: ReactNode;
}

export const Alert = ({ children }: AlertProps) => {
  return (
    <div className="rounded-md bg-slate-200 text-slate-600 p-4 flex gap-2">
      <Info width="20" className="text-slate-500" />
      {children}
    </div>
  );
};
