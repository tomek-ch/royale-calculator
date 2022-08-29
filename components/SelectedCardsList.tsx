import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { Option, Options } from "./Options";
import { SelectedCardData } from "./SelectedCardData";

interface SelectedCardsListProps {
  cards: SelectedCard[];
  remove: (selectedCard: SelectedCard) => void;
  edit: (selectedCard: SelectedCard) => void;
}

export const SelectedCardsList = ({
  cards,
  remove,
  edit,
}: SelectedCardsListProps) => {
  if (!cards.length) {
    return <Alert>No cards selected</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-3">
      {cards.map((selectedCard) => (
        <SelectedCardData
          onClick={() => edit(selectedCard)}
          selectedCard={selectedCard}
          key={selectedCard.card.id}
          options={
            <Options>
              <Option onClick={() => edit(selectedCard)}>Edit</Option>
              <Option onClick={() => remove(selectedCard)}>Remove</Option>
            </Options>
          }
        />
      ))}
    </div>
  );
};
