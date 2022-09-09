import { FormEvent } from "react";

export const createSubmitHandler = (
  cb: (e: FormEvent<HTMLFormElement>) => void
) => {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cb(e);
  };
};
