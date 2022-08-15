import { ReactNode } from "react";

interface InlineErrorProps {
  children: ReactNode;
}

export const InlineError = ({ children }: InlineErrorProps) => {
  return <div className="text-red-600 mt-1">{children}</div>;
};
