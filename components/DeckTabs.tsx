import { useMyContext } from "../context/MyContext";
import { Tabs } from "./Tabs";

interface DeckTabsProps {
  onChange: (tab: number) => void;
  activeTab: number;
}

export const DeckTabs = ({ activeTab, onChange }: DeckTabsProps) => {
  const {
    decks: { decks },
  } = useMyContext();
  return (
    <Tabs
      tabs={decks.map((_, idx) => {
        if (idx === activeTab) {
          return `Slot ${idx + 1}`;
        }
        return (idx + 1).toString();
      })}
      onChange={onChange}
      activeTab={activeTab}
    />
  );
};
