import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { SelectedCardData } from "./SelectedCardData";

interface SelectedCardsListProps {
  cards: SelectedCard[];
}

export const SelectedCardsList = ({ cards }: SelectedCardsListProps) => {
  if (!cards.length) {
    return <Alert>No cards selected</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-3">
      {cards.map((selectedCard) => (
        <SelectedCardData
          selectedCard={selectedCard}
          key={selectedCard.card.id}
        />
      ))}
    </div>
  );
};
