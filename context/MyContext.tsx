import { createContext, ReactNode, useContext } from "react";
import { useBulkEdit } from "../hooks/useBulkEdit";
import { useDecks } from "../hooks/useDecks";
import { usePlayer } from "../hooks/usePlayer";
import { useSelectedCard } from "../hooks/useSelectedCard";
import { Card } from "../utils/types";

interface MyContext {
  decks: ReturnType<typeof useDecks>;
  selectedCard: ReturnType<typeof useSelectedCard>;
  bulkEdit: ReturnType<typeof useBulkEdit>;
  player: ReturnType<typeof usePlayer>;
  cards: Card[];
}

const MyContext = createContext({} as MyContext);

export const MyContextProvider = ({
  children,
  cards,
}: {
  children: ReactNode;
  cards: Card[];
}) => {
  const decks = useDecks();
  const selectedCard = useSelectedCard(decks.deck, decks.setDeck);
  const bulkEdit = useBulkEdit(decks.deck, decks.setDeck);
  const player = usePlayer();
  return (
    <MyContext.Provider
      value={{
        decks,
        selectedCard,
        bulkEdit,
        player,
        cards,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
