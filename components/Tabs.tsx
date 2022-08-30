import { Button } from "./Button";
import { Plus } from "./icons/Plus";

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (idx: number) => void;
  onAdd: () => void;
}

export const Tabs = ({ tabs, activeTab, onChange, onAdd }: TabsProps) => {
  return (
    <div className="flex mb-4 gap-2 items-center">
      {tabs.map((name, idx) => (
        <button
          key={idx}
          className={`px-4 py-2 rounded-md font-medium ${
            idx === activeTab ? "text-black" : "text-stone-400"
          }`}
          onClick={() => onChange(idx)}
        >
          {name}
        </button>
      ))}
      <Button variant="round" onClick={onAdd}>
        <Plus width="16" />
      </Button>
    </div>
  );
};
