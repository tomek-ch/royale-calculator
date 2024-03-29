import { useState } from "react";
import { Card, PlayerCard, SelectedCard } from "../utils/types";

export const useSelectedCard = (
  deck: SelectedCard[],
  setDeck: (cb: (prev: SelectedCard[]) => SelectedCard[]) => void,
  playerCardsMap: Record<number, PlayerCard>
) => {
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const getSelectedCard = (card: Card): SelectedCard => {
    const playerCard = playerCardsMap[card.id];
    return {
      card,
      fromLevel: playerCard?.level || card.startingLevel,
      toLevel: 14,
      isSelected: false,
    };
  };

  const selectCard = (card: Card) => {
    const editedCard = deck.find(({ card: { id } }) => id === card.id);
    setSelectedCard(editedCard || getSelectedCard(card));
  };

  const resetCard = () => {
    setSelectedCard(null);
  };

  const editSelectedCard = (selectedCard: SelectedCard) => {
    setSelectedCard(selectedCard);
  };

  const isEditing = !!deck.find(({ card }) => card === selectedCard?.card);

  const addSelectedCard = () => {
    if (isEditing) {
      setDeck((prev) =>
        prev.map((item) =>
          item.card === (selectedCard as SelectedCard).card
            ? (selectedCard as SelectedCard)
            : item
        )
      );
    } else {
      setDeck((prev) => [...prev, selectedCard as SelectedCard]);
    }
  };

  const setFromLevel = (fromLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), fromLevel }));
  const setToLevel = (toLevel: number) =>
    setSelectedCard((prev) => ({ ...(prev as SelectedCard), toLevel }));

  const remove = (selectedCard: SelectedCard) => {
    setDeck((prev) => prev.filter((card) => card !== selectedCard));
  };

  return {
    selectedCard,
    selectCard,
    resetCard,
    editSelectedCard,
    isEditing,
    addSelectedCard,
    setFromLevel,
    setToLevel,
    remove,
    getSelectedCard,
  };
};
