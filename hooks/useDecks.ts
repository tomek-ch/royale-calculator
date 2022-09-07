import { SelectedCard } from "../utils/types";
import { useSyncedValue } from "./useSyncedValue";

export const useDecks = () => {
  const [decks, setDecks] = useSyncedValue<SelectedCard[][]>("decks", [
    [],
    [],
    [],
    [],
    [],
  ]);
  const [currentTab, setCurrentTab] = useSyncedValue("tab", 0);

  const deck = decks[currentTab];
  const setDeck = (cb: (prev: SelectedCard[]) => SelectedCard[]) =>
    setDecks((prev) =>
      prev.map((deck, idx) => {
        if (idx === currentTab) {
          return cb(prev[currentTab]);
        }
        return deck;
      })
    );

  return { decks, deck, setDeck, currentTab, setCurrentTab };
};
