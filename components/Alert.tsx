import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
}

export const Alert = ({ children }: AlertProps) => {
  return <div className="rounded-md bg-slate-200 p-4">{children}</div>;
};
