import { ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Variant = keyof typeof styles;

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
};

const styles = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500",
  secondary: "border-solid border-[1px] border-gray-300 hover:border-gray-400",
  round: "h-8 w-8 grid place-content-center hover:bg-slate-100 rounded-full",
} as const;

export const Button = ({
  variant = "secondary",
  children,
  className = "",
  onClick,
  loading,
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={`
      block transition-all whitespace-nowrap leading-5
      active:scale-95 active:disabled:scale-100 relative
      ${styles[variant]}
      ${loading ? "text-transparent" : ""}
      ${variant === "round" ? "" : "py-2 px-4 rounded-md"}
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
