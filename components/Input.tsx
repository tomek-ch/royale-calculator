import { HTMLProps } from "react";

export const Input = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <input
      className={`
      block w-full py-2 px-3 leading-5 rounded-md bg-gray-200 outline-none
      hover:bg-gray-300 transition-all
      focus:outline-2 focus:outline-blue-500 outline-offset-0
      `}
      {...props}
    />
  );
};
