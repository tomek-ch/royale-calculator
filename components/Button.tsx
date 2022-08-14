import { ReactNode } from "react";

type Variant = keyof typeof styles;

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const styles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border-solid border-[1px] border-gray-300 hover:border-gray-400",
} as const;

export const Button = ({
  variant = "secondary",
  children,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={`
        block py-1 px-3 rounded-md active:scale-95 transition-all
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
