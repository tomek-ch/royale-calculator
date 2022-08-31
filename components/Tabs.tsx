import { Button } from "./Button";
import { Plus } from "./icons/Plus";
import { Xmark } from "./icons/Xmark";

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (idx: number) => void;
  onAdd: () => void;
  onDelete: (idx: number) => void;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  onAdd,
  onDelete,
}: TabsProps) => {
  return (
    <div className="flex mb-4 gap-2 items-center">
      {tabs.map((name, idx) => (
        <div className="flex items-center">
          <button
            key={idx}
            className={`px-4 py-2 rounded-md font-medium ${
              idx === activeTab ? "text-black" : "text-stone-400"
            }`}
            onClick={() => onChange(idx)}
          >
            {name}
          </button>
          <Button onClick={() => onDelete(idx)} variant="round">
            <Xmark width="10" />
          </Button>
        </div>
      ))}
      <Button variant="round" onClick={onAdd}>
        <Plus width="16" />
      </Button>
    </div>
  );
};
