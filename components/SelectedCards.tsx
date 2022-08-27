import { useModal } from "../hooks/useModal";
import { Card, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { SelectedCardsList } from "./SelectedCardsList";
import { useState } from "react";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { getRequiredCards, getRequiredGold } from "../utils/getRequired";

interface SelectedCardsProps {
  cards: Card[];
}

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const [myCards, setMyCards] = useState<SelectedCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const selectCard = (card: Card) => {
    if (!myCards.find(({ card: { id } }) => id === card.id)) {
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

  const modal = useModal({ onClose: resetCard });

  const addSelectedCard = () => {
    setMyCards((prev) => [...prev, selectedCard as SelectedCard]);
    modal.toggle();
  };

  const setFromLevel = (fromLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), fromLevel }));
  const setToLevel = (toLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), toLevel }));

  return (
    <>
      <h2 className="mt-5 mb-3">Selected cards</h2>
      <SelectedCardsList cards={myCards} />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <Modal {...modal} type="drawer" title="Add a card">
        {selectedCard ? (
          <CardUpgradeForm
            selectedCard={selectedCard}
            addToDeck={addSelectedCard}
            goBack={resetCard}
            setFromLevel={setFromLevel}
            setToLevel={setToLevel}
          />
        ) : (
          <CardSearch cards={cards} onCardSelect={selectCard} />
        )}
      </Modal>
    </>
  );
};
