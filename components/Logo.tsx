import { Crown } from "./icons/Crown";

export const Logo = () => {
  return (
    <h1 className="flex gap-1 items-center text-xl dark:text-slate-100">
      <Crown width={20} />
      <span className="hidden sm:inline">Royale </span>Calculator
    </h1>
  );
};
