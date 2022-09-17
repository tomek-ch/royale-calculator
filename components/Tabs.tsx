interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (idx: number) => void;
  className?: string;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsProps) => {
  return (
    <div
      className={`flex mb-4 gap-2 items-center bg-slate-200 rounded-lg p-1
      dark:bg-slate-800 ${className}`}
    >
      {tabs.map((name, idx) => (
        <button
          key={idx}
          className={`px-4 py-2 rounded-md font-medium transition-all ${
            idx === activeTab
              ? "text-black bg-white dark:text-slate-300 dark:bg-slate-700"
              : `text-slate-400 hover:bg-slate-100 hover:text-slate-500
                dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-400`
          }`}
          onClick={() => onChange(idx)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
