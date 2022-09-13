import { ReactNode } from "react";
import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
import { Xmark } from "./icons/Xmark";

interface ModalHeaderProps {
  title: ReactNode;
  close: () => void;
  goBack?: (() => void) | null;
}

export const ModalHeader = ({ title, close, goBack }: ModalHeaderProps) => {
  return (
    <div className="flex text-xl mb-4 items-center">
      {goBack ? (
        <Button onClick={goBack} variant="round" className="mr-2">
          <ArrowLeft width="16" />
        </Button>
      ) : (
        <></>
      )}
      {title}
      <button
        className="
        ml-auto h-8 w-8 flex justify-center items-center
        hover:bg-slate-100 rounded-full transition-all"
        onClick={close}
      >
        <Xmark />
      </button>
    </div>
  );
};
