import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

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
  onChange: (value: any) => {},
});

export const SelectBtn = ({ children }: { children: ReactNode }) => {
  const { toggle } = useContext(Context);
  return (
    <button
      onClick={toggle}
      className="py-2 px-3 leading-5 rounded-md bg-gray-200 w-full text-left"
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
  const { onChange, toggle } = useContext(Context);

  const handleClick = () => {
    onChange(value);
    toggle();
  };

  return (
    <button
      onClick={handleClick}
      className="text-left py-1 px-3 hover:bg-slate-100 transition-all"
    >
      {children}
    </button>
  );
};

export const SelectOptions = ({ children }: { children: ReactNode }) => {
  const { isActive } = useContext(Context);

  if (isActive) {
    return (
      <div className="absolute flex flex-col bg-white shadow-md w-full rounded-md mt-1">
        {children}
      </div>
    );
  }

  return null;
};

export const Select = <T,>({
  selected,
  children,
  onChange,
  className = "",
}: SelectProps<T>) => {
  const [isActive, setIsActive] = useState(false);
  const container = useRef(null);
  useClickOutside([isActive, setIsActive], container?.current);

  const toggle = () => setIsActive((prev) => !prev);

  return (
    <Context.Provider value={{ isActive, toggle, selected, onChange }}>
      <div
        className={`relative ${className} ${isActive ? "z-10" : ""}`}
        ref={container}
      >
        {children}
      </div>
    </Context.Provider>
  );
};
