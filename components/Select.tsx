import { createContext, ReactNode, useContext, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useTransition } from "../hooks/useTransition";

interface SelectProps<T> {
  selected: T;
  children: ReactNode;
  onChange: (value: T) => void;
  className?: string;
}

const Context = createContext({
  isActive: false,
  selected: null as unknown,
  toggle: () => {},
  onChange: (_value: any) => {},
});

export const SelectBtn = ({ children }: { children: ReactNode }) => {
  const { toggle } = useContext(Context);
  return (
    <button
      onClick={toggle}
      className={`py-2 px-3 leading-5 bg-gray-200 w-full text-left`}
    >
      {children}
    </button>
  );
};

export const SelectOption = <T,>({
  children,
  value,
}: {
  children: ReactNode;
  value: T;
}) => {
  const { onChange, toggle, isActive } = useContext(Context);

  const handleClick = () => {
    onChange(value);
    toggle();
  };

  return (
    <button
      {...(isActive ? {} : { tabIndex: -1 })}
      onClick={handleClick}
      className="text-left py-1 px-3 hover:bg-slate-100 transition-all"
    >
      {children}
    </button>
  );
};

export const SelectOptions = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      className="absolute flex flex-col bg-white shadow-md w-full rounded-b-md max-h-36 overflow-auto"
    >
      {children}
    </div>
  );
};

export const Select = <T,>({
  selected,
  children,
  onChange,
  className = "",
}: SelectProps<T>) => {
  const { isActive, toggle, isExiting, finishExit } = useTransition();

  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside([isActive, toggle], ref?.current);

  return (
    <Context.Provider value={{ isActive, toggle, selected, onChange }}>
      <div className="relative h-9">
        <div
          style={
            isExiting || !isActive ? {} : { height: ref.current?.scrollHeight }
          }
          className={`
            h-full outline outline-blue-500 absolute top-0 rounded-md transition-all overflow-hidden
            ${className}
            ${isActive && !isExiting ? "outline-2" : "outline-0"}
          `}
          ref={ref}
          onTransitionEnd={() => {
            if (isExiting) {
              finishExit();
            }
          }}
        >
          {children}
        </div>
      </div>
    </Context.Provider>
  );
};
