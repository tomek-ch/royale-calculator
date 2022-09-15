import { createContext, ReactNode, useContext } from "react";
import { useBulkEdit } from "../hooks/useBulkEdit";
import { useDecks } from "../hooks/useDecks";
import { usePlayer } from "../hooks/usePlayer";
import { useSelectedCard } from "../hooks/useSelectedCard";
import { useTheme } from "../hooks/useTheme";
import { Card } from "../utils/types";

interface MyContext {
  decks: ReturnType<typeof useDecks>;
  selectedCard: ReturnType<typeof useSelectedCard>;
  bulkEdit: ReturnType<typeof useBulkEdit>;
  player: ReturnType<typeof usePlayer>;
  theme: ReturnType<typeof useTheme>;
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
  const player = usePlayer();
  const selectedCard = useSelectedCard(
    decks.deck,
    decks.setDeck,
    player.playerCards
  );
  const bulkEdit = useBulkEdit(decks.deck, decks.setDeck);
  const theme = useTheme();
  return (
    <MyContext.Provider
      value={{
        decks,
        selectedCard,
        bulkEdit,
        player,
        cards,
        theme,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
