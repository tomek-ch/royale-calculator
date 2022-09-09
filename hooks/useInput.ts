import { ChangeEvent, useState } from "react";

export const useInput = (cb?: (e: ChangeEvent<HTMLInputElement>) => void) => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    cb?.(e);
  };

  return [input, handleChange] as const;
};
