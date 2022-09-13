import { useState } from "react";
import { useMyContext } from "../context/MyContext";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Deck } from "./Deck";
import { DeckTabs } from "./DeckTabs";

interface PasteDeckProps {
  onPaste: () => void;
}

export const PasteDeck = ({ onPaste }: PasteDeckProps) => {
  const {
    player: { copiedDeck },
    decks: { decks, setSlot, setCurrentTab },
    selectedCard: { getSelectedCard },
  } = useMyContext();

  const [tabToPaste, setTabToPaste] = useState(0);

  const paste = () => {
    setSlot(tabToPaste, () => (copiedDeck || []).map(getSelectedCard));
    setCurrentTab(tabToPaste);
    onPaste();
  };

  return (
    <>
      <Deck cards={copiedDeck || []} />
      <div className="mt-8 mb-4">Select where to paste this deck</div>
      <DeckTabs onChange={setTabToPaste} activeTab={tabToPaste} />
      {decks[tabToPaste].length ? (
        <Deck cards={decks[tabToPaste].map(({ card }) => card)} />
      ) : (
        <Alert>No cards here</Alert>
      )}
      <Button variant="primary" className="mt-4 ml-auto" onClick={paste}>
        Paste
      </Button>
    </>
  );
};
