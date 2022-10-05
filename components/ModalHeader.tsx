import { ReactNode } from "react";
import { Button } from "./Button";
import { ArrowLeft } from "./icons/ArrowLeft";
import { Xmark } from "./icons/Xmark";

interface ModalHeaderProps {
  title: ReactNode;
  close: () => void;
  goBack?: (() => void) | null;
  withCloseBtn?: boolean;
}

export const ModalHeader = ({
  title,
  close,
  goBack,
  withCloseBtn,
}: ModalHeaderProps) => {
  return (
    <div className="flex text-xl mb-4 items-center">
      {goBack ? (
        <Button
          onClick={goBack}
          variant="round"
          className="mr-2 dark:hover:bg-slate-700"
        >
          <ArrowLeft width="16" />
        </Button>
      ) : (
        <></>
      )}
      <div className="dark:text-white">{title}</div>
      {withCloseBtn && (
        <Button
          onClick={close}
          variant="round"
          className="ml-auto dark:hover:bg-slate-700"
        >
          <Xmark />
        </Button>
      )}
    </div>
  );
};
