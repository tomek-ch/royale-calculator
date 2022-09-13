import { ReactNode } from "react";
import { Check } from "./icons/Check";

interface CheckboxProps {
  label: ReactNode;
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({
  label,
  className,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={`group flex gap-1 items-center ${className || ""}`}>
      <input
        checked={checked}
        type="checkbox"
        className="hidden"
        onChange={({ target: { checked } }) => {
          onChange(checked);
        }}
      />
      <div
        className={`w-4 h-4 rounded-[4px] transition-colors grid place-content-center ${
          checked
            ? "bg-blue-500 group-hover:bg-blue-600 text-white"
            : "bg-slate-300 group-hover:bg-slate-400/70 text-transparent"
        }`}
      >
        <Check width="12" />
      </div>
      {label}
    </label>
  );
};
