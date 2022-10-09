import { useState } from "react";
import { useMyContext } from "../context/MyContext";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Deck } from "./Deck";
import { DeckTabs } from "./DeckTabs";
import { MsgBox } from "./Tutorial";

interface PasteDeckProps {
  onPaste: () => void;
}

export const PasteDeck = ({ onPaste }: PasteDeckProps) => {
  const {
    player: { copiedDeck },
    decks: { decks, setSlot, setCurrentTab, currentTab },
    selectedCard: { getSelectedCard },
    tutorial,
  } = useMyContext();

  const [tabToPaste, setTabToPaste] = useState(currentTab);
  const [replace, setReplace] = useState(true);

  const paste = () => {
    const newCards = (copiedDeck || []).map(getSelectedCard);
    if (replace) {
      setSlot(tabToPaste, () => newCards);
    } else {
      setSlot(tabToPaste, (prev) => [
        ...prev,
        ...newCards.filter(
          ({ card: { id } }) => !prev.some(({ card }) => id === card.id)
        ),
      ]);
    }
    setCurrentTab(tabToPaste);
    onPaste();
  };

  return (
    <div className="overflow-y-auto h-[calc(100%-72px)] pr-2">
      <Deck cards={copiedDeck || []} />
      <div className="mt-8 mb-4">Select where to paste this deck</div>
      <DeckTabs
        onChange={setTabToPaste}
        activeTab={tabToPaste}
        className="dark:!bg-slate-900"
      />
      {decks[tabToPaste].length ? (
        <Deck cards={decks[tabToPaste].map(({ card }) => card)} />
      ) : (
        <Alert className="dark:!bg-slate-700">No cards here</Alert>
      )}
      <Checkbox
        checked={replace}
        onChange={setReplace}
        label="Replace slot contents"
        className="my-4"
      />
      {tutorial.isPasteStep && (
        <div className="fixed inset-0 bg-black/70 w-full z-10" />
      )}
      {tutorial.isPasteStep && (
        <div className="relative">
          <MsgBox className="absolute right-0 mb-2 bottom-full">
            Click here to paste the deck into the calculator and see the upgrade
            costs
          </MsgBox>
        </div>
      )}
      <Button
        variant="primary"
        className="ml-auto relative z-10"
        onClick={paste}
      >
        Paste
      </Button>
    </div>
  );
};
