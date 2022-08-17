import { useModal } from "../hooks/useModal";
import { Card, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { SelectedCardsList } from "./SelectedCardsList";
import { useState } from "react";
import { CardSearch } from "./CardSearch";
import { UpgradeForm } from "./UpgradeForm";

interface SelectedCardsProps {
  cards: Card[];
}

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const modal = useModal();
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const selectCard = (card: Card) => {
    setSelectedCard({
      card,
      fromLevel: card.startingLevel,
      toLevel: 14,
    });
  };

  return (
    <>
      <h2 className="mt-5 mb-3">Selected cards</h2>
      <SelectedCardsList />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <Modal {...modal} type="drawer" title="Add a card">
        {selectedCard ? (
          <UpgradeForm />
        ) : (
          <CardSearch cards={cards} onCardSelect={selectCard} />
        )}
      </Modal>
    </>
  );
};
