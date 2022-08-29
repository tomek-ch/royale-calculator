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
import { UpgradeSummary } from "./UpgradeSummary";

const SelectedCardsList = dynamic(
  async () => {
    const module = await import("./SelectedCardsList");
    return module.SelectedCardsList;
  },
  {
    ssr: false,
  }
);

interface SelectedCardsProps {
  cards: Card[];
}

const STORAGE_KEY = "cards";

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const [myCards, setMyCards] = useState<SelectedCard[]>(
    getFromStorage(STORAGE_KEY) || []
  );
  useLocalStorage(STORAGE_KEY, myCards);

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

  const modalTitle = isEditing ? "Editing card" : "Add a card";

  return (
    <>
      <SelectedCardsList cards={myCards} remove={remove} edit={edit} />
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
