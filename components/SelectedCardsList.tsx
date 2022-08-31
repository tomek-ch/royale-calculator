import { useEffect, useRef } from "react";
import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { Option, Options } from "./Options";
import { SelectedCardData } from "./SelectedCardData";

interface SelectedCardsListProps {
  cards: SelectedCard[];
  remove: (selectedCard: SelectedCard) => void;
  edit: (selectedCard: SelectedCard) => void;
  selectForEdit: (id: number) => void;
  selectedList: number[];
  cancelSelect: () => void;
}

export const SelectedCardsList = ({
  cards,
  remove,
  edit,
  selectForEdit,
  selectedList,
  cancelSelect,
}: SelectedCardsListProps) => {
  const cardTiles = useRef<(HTMLDivElement | null)[]>([]);
  const isSelectMode = !!selectedList.length;

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const isOutsideTiles = cardTiles.current.every(
        (element) => !element?.contains(e.target as Node)
      );

      if (isOutsideTiles) {
        cancelSelect();
      }
    };

    const unsubscribe = () =>
      document.removeEventListener("click", handleClickOutside);

    if (isSelectMode) {
      document.addEventListener("click", handleClickOutside);
    } else {
      unsubscribe();
    }

    return unsubscribe;
  }, [isSelectMode, cardTiles]);

  if (!cards.length) {
    return <Alert>No cards selected</Alert>;
  }

  return (
    <div className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-3">
      {cards.map((selectedCard, idx) => (
        <div
          key={selectedCard.card.id}
          ref={(el) => (cardTiles.current[idx] = el)}
        >
          <SelectedCardData
            onClick={() => edit(selectedCard)}
            selectedCard={selectedCard}
            options={
              <Options>
                <Option onClick={() => edit(selectedCard)}>Edit</Option>
                <Option onClick={() => remove(selectedCard)}>Remove</Option>
              </Options>
            }
            onSelect={() => selectForEdit(selectedCard.card.id)}
            selected={selectedList.includes(selectedCard.card.id)}
          />
        </div>
      ))}
    </div>
  );
};
