import { ChangeEvent, useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return { input, handleChange };
};
