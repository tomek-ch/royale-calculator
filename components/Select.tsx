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
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      className="absolute flex flex-col bg-white shadow-md w-full rounded-b-md"
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
  const [isActive, setIsActive] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const toggle = () => setIsActive((prev) => !prev);
  useClickOutside([isActive, toggle], ref?.current);

  return (
    <Context.Provider value={{ isActive, toggle, selected, onChange }}>
      <div className="relative h-9">
        <div
          style={isActive ? { height: ref.current?.scrollHeight } : {}}
          className={`outline outline-blue-500 absolute top-0 rounded-md transition-all overflow-hidden ${className} ${
            isActive ? "z-10 outline-2" : "h-full outline-0"
          }`}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Context.Provider>
  );
};
