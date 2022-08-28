import { useTransition } from "../hooks/useTransition";
import { Card, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { SelectedCardsList } from "./SelectedCardsList";
import { useEffect, useState } from "react";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { getFromStorage } from "../utils/getFromStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SelectedCardsProps {
  cards: Card[];
}

const STORAGE_KEY = "cards";

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const [myCards, setMyCards] = useState<SelectedCard[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useLocalStorage(STORAGE_KEY, myCards, isHydrated);
  useEffect(() => {
    setMyCards(getFromStorage(STORAGE_KEY));
    setIsHydrated(true);
  }, []);

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

  const modal = useTransition({ onClose: resetCard });

  const addSelectedCard = () => {
    setMyCards((prev) => [...prev, selectedCard as SelectedCard]);
    modal.toggle();
  };

  const setFromLevel = (fromLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), fromLevel }));
  const setToLevel = (toLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), toLevel }));

  const remove = (selectedCard: SelectedCard) => {
    setMyCards((prev) => prev.filter((card) => card !== selectedCard));
  };

  return (
    <>
      <h2 className="mt-5 mb-3">Selected cards</h2>
      {isHydrated && <SelectedCardsList cards={myCards} remove={remove} />}
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
