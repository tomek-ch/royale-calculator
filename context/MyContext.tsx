import { createContext, ReactNode, useContext } from "react";
import { useBulkEdit } from "../hooks/useBulkEdit";
import { useDecks } from "../hooks/useDecks";
import { usePlayer } from "../hooks/usePlayer";
import { useSelectedCard } from "../hooks/useSelectedCard";
import { useTheme } from "../hooks/useTheme";
import { useTutorial } from "../hooks/useTutorial";
import { Card } from "../utils/types";

interface MyContext {
  decks: ReturnType<typeof useDecks>;
  selectedCard: ReturnType<typeof useSelectedCard>;
  bulkEdit: ReturnType<typeof useBulkEdit>;
  player: ReturnType<typeof usePlayer>;
  theme: ReturnType<typeof useTheme>;
  tutorial: ReturnType<typeof useTutorial>;
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
    player.playerCardsMap
  );
  const bulkEdit = useBulkEdit(decks.deck, player, decks.setDeck);
  const theme = useTheme();
  const tutorial = useTutorial();
  return (
    <MyContext.Provider
      value={{
        decks,
        selectedCard,
        bulkEdit,
        player,
        cards,
        theme,
        tutorial,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
