import { useTransition } from "../hooks/useTransition";
import { Card, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useState } from "react";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { getFromStorage } from "../utils/getFromStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import dynamic from "next/dynamic";
import { ArrowLeft } from "./icons/ArrowLeft";

const SelectedCardsList = dynamic(
  async () => {
    const mod = await import("./SelectedCardsList");
    return mod.SelectedCardsList;
  },
  { ssr: false }
);

const UpgradeSummary = dynamic(
  async () => {
    const mod = await import("./UpgradeSummary");
    return mod.UpgradeSummary;
  },
  { ssr: false }
);

const Tabs = dynamic(
  async () => {
    const mod = await import("./Tabs");
    return mod.Tabs;
  },
  { ssr: false }
);

interface SelectedCardsProps {
  cards: Card[];
}

const DECKS_STORAGE_KEY = "decks";
const TAB_STORAGE_KEY = "tab";

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const [decks, setDecks] = useState<SelectedCard[][]>(
    getFromStorage(DECKS_STORAGE_KEY) || [[], [], [], [], []]
  );
  const [currentTab, setCurrentTab] = useState(
    getFromStorage(TAB_STORAGE_KEY) || 0
  );
  const [selectedForEdit, setSelectedForEdit] = useState<number[]>([]);

  const myCards = decks[currentTab];
  const setMyCards = (cb: (prev: SelectedCard[]) => SelectedCard[]) =>
    setDecks((prev) =>
      prev.map((deck, idx) => {
        if (idx === currentTab) {
          return cb(prev[currentTab]);
        }
        return deck;
      })
    );

  useLocalStorage(DECKS_STORAGE_KEY, decks);
  useLocalStorage(TAB_STORAGE_KEY, currentTab);

  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const selectCard = (card: Card) => {
    const editedCard = myCards.find(({ card: { id } }) => id === card.id);
    if (editedCard) {
      setSelectedCard(editedCard);
    } else {
      setSelectedCard({
        card,
        fromLevel: card.startingLevel,
        toLevel: 14,
      });
    }
  };

  const resetCard = () => {
    setSelectedCard(null);
  };

  const modal = useTransition({ onClose: resetCard });

  const edit = (selectedCard: SelectedCard) => {
    setSelectedCard(selectedCard);
    modal.toggle();
  };

  const isEditing = !!myCards.find(({ card }) => card === selectedCard?.card);

  const addSelectedCard = () => {
    if (isEditing) {
      setMyCards((prev) =>
        prev.map((item) =>
          item.card === (selectedCard as SelectedCard).card
            ? (selectedCard as SelectedCard)
            : item
        )
      );
    } else {
      setMyCards((prev) => [...prev, selectedCard as SelectedCard]);
    }

    modal.toggle();
  };

  const setFromLevel = (fromLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), fromLevel }));
  const setToLevel = (toLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), toLevel }));

  const remove = (selectedCard: SelectedCard) => {
    setMyCards((prev) => prev.filter((card) => card !== selectedCard));
  };

  const selectForEdit = (id: number) =>
    setSelectedForEdit((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });

  const modalTitle = isEditing ? "Editing card" : "Add a card";

  return (
    <>
      <Tabs
        tabs={decks.map((_, idx) => {
          if (idx === currentTab) {
            return `Deck ${idx + 1}`;
          }
          return (idx + 1).toString();
        })}
        onChange={setCurrentTab}
        activeTab={currentTab}
      />
      <SelectedCardsList
        cards={myCards}
        remove={remove}
        edit={edit}
        selectForEdit={selectForEdit}
        selectedList={selectedForEdit}
      />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <UpgradeSummary selectedCards={myCards} />
      <Modal
        {...modal}
        type="drawer"
        title={
          selectedCard ? (
            <div className="mb-3 flex gap-2">
              <button onClick={resetCard}>
                <ArrowLeft width={16} />
              </button>
              {modalTitle}
            </div>
          ) : (
            modalTitle
          )
        }
      >
        {selectedCard ? (
          <CardUpgradeForm
            selectedCard={selectedCard}
            addToDeck={addSelectedCard}
            goBack={resetCard}
            setFromLevel={setFromLevel}
            setToLevel={setToLevel}
            isEditing={isEditing}
          />
        ) : (
          <CardSearch cards={cards} onCardSelect={selectCard} />
        )}
      </Modal>
    </>
  );
};
