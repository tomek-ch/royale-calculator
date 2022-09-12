import { createContext, ReactNode, useContext, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useTransition } from "../hooks/useTransition";
import { VerticalDots } from "./icons/VerticalDots";

interface OptionsProps {
  children: ReactNode;
}

interface OptionProps {
  children: ReactNode;
  onClick: () => void;
}

const Context = createContext(() => {});

export const Option = ({ children, onClick }: OptionProps) => {
  const toggle = useContext(Context);

  const handleClick = () => {
    onClick();
    toggle();
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full text-left px-4 py-2 font-normal text-base hover:bg-slate-100 transition-all rounded-md"
    >
      {children}
    </button>
  );
};

export const Options = ({ children }: OptionsProps) => {
  const { isActive, toggle, finishExit, isExiting } = useTransition();

  const optionsContainer = useRef<HTMLDivElement | null>(null);
  useClickOutside([optionsContainer], toggle, isActive);

  return (
    <Context.Provider value={toggle}>
      <div className="relative" ref={optionsContainer}>
        <button
          onClick={() => toggle()}
          className={`
          w-7 h-7 flex justify-center
          items-center rounded-full transition-all
          ${isActive && !isExiting ? "bg-slate-900/10" : "hover:bg-slate-900/5"}
          `}
        >
          <VerticalDots height={16} />
        </button>
        {isActive && (
          <div
            className={`
            shadow-lg p-1 rounded-lg absolute bg-white whitespace-nowrap right-0
            ${isExiting ? "animate-hide" : "animate-pop-up"}
            `}
            onAnimationEnd={({ animationName }) => {
              if (animationName === "hide") {
                finishExit();
              }
            }}
          >
            {children}
          </div>
        )}
      </div>
    </Context.Provider>
  );
};
