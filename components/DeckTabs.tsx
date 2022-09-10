import { useMyContext } from "../context/MyContext";
import { Tabs } from "./Tabs";

interface DeckTabsProps {}

export const DeckTabs = ({}: DeckTabsProps) => {
  const {
    decks: { decks, currentTab, setCurrentTab },
    bulkEdit: { cancelSelect },
  } = useMyContext();

  const handleTabChange = (newTab: number) => {
    cancelSelect();
    setCurrentTab(newTab);
  };

  return (
    <Tabs
      tabs={decks.map((_, idx) => {
        if (idx === currentTab) {
          return `Deck ${idx + 1}`;
        }
        return (idx + 1).toString();
      })}
      onChange={handleTabChange}
      activeTab={currentTab}
    />
  );
};
