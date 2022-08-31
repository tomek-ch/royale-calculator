interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (idx: number) => void;
}

export const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex mb-4 gap-2 items-center bg-slate-200 rounded-lg p-1">
      {tabs.map((name, idx) => (
        <button
          key={idx}
          className={`px-4 py-2 rounded-md font-medium transition-all ${
            idx === activeTab
              ? "text-black bg-white"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-500"
          }`}
          onClick={() => onChange(idx)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
