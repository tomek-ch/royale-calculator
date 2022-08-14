import { ReactNode } from "react";

interface InlineLinkProps {
  children: ReactNode;
  onClick: () => void;
}

export const Link = ({ onClick, children }: InlineLinkProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-block text-gray-600 hover:text-black active:scale-95 transition-all"
    >
      {children}
    </button>
  );
};
