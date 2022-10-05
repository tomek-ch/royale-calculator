import { HTMLProps } from "react";

export const Input = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`
      block w-full py-2 px-3 leading-5 rounded-md bg-gray-200 outline-none
      hover:bg-gray-300 transition-all
      focus:outline-2 focus:outline-blue-500 outline-offset-0
      hover:focus:bg-gray-200 dark:hover:focus:bg-slate-700
      dark:bg-slate-700 dark:hover:bg-slate-600 ${props.className || ""}
      `}
    />
  );
};
