import { Xmark } from "./icons/Xmark";

interface ModalHeaderProps {
  title: string;
  close: () => void;
}

export const ModalHeader = ({ title, close }: ModalHeaderProps) => {
  return (
    <div className="flex text-xl mb-4">
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
