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

  const setSlot = (
    slot: number,
    cb: (prev: SelectedCard[]) => SelectedCard[]
  ) =>
    setDecks((prev) =>
      prev.map((deck, idx) => {
        if (idx === slot) {
          return cb(prev[slot]);
        }
        return deck;
      })
    );

  const deck = decks[currentTab];
  const setDeck = (cb: (prev: SelectedCard[]) => SelectedCard[]) => {
    setSlot(currentTab, cb);
  };

  return { decks, deck, setDeck, currentTab, setCurrentTab, setSlot };
};
