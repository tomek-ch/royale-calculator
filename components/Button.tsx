import { ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Variant = keyof typeof styles;
type Size = keyof typeof sizes;

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  size?: Size;
};

const styles = {
  primary: `bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500
    dark:bg-blue-600 dark:hover:bg-blue-700`,
  secondary: `border-solid border-[1px] border-gray-300 hover:border-gray-400
    dark:border-slate-600 dark:hover:border-slate-500 dark:text-slate-200`,
  round: `grid place-content-center hover:bg-slate-100 rounded-full
    dark:text-slate-200 dark:hover:bg-slate-800`,
  ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200",
} as const;

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
} as const;

export const Button = ({
  variant = "secondary",
  children,
  className = "",
  onClick,
  loading,
  size = "sm",
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={`
      block transition-all whitespace-nowrap leading-5
      active:scale-95 active:disabled:scale-100 relative
      ${styles[variant]}
      ${loading ? "text-transparent" : ""}
      ${variant === "round" ? sizes[size] : "py-2 px-4 rounded-md"}
      ${className}
    `}
      onClick={() => onClick?.()}
    >
      {loading ? (
        <>
          <Spinner className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};
