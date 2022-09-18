import { ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: keyof typeof variants;
};

const variants = {
  secondary:
    "text-gray-600 hover:text-black dark:text-slate-400 dark:hover:text-slate-300",
  primary: "text-blue-500 hover:text-blue-600",
};

export const Link = ({
  children,
  href,
  onClick,
  variant = "secondary",
}: LinkProps) => {
  const Element = onClick ? "button" : "a";
  return (
    <Element
      {...(onClick ? { onClick } : { href, target: "_blank" })}
      className={`active:scale-95 transition-all ${variants[variant]}`}
    >
      {children}
    </Element>
  );
};
