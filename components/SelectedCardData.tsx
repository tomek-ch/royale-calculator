import { ReactNode } from "react";
import { getRequiredCards, getRequiredGold } from "../utils/getRequired";
import { Card, SelectedCard } from "../utils/types";
import { CardBtn } from "./CardBtn";

interface SelectedCardDataProps {
  selectedCard: SelectedCard;
  withShadow?: boolean;
  options?: ReactNode;
  onClick: (card: Card) => void;
}

export const SelectedCardData = ({
  selectedCard,
  withShadow = true,
  options,
  onClick,
}: SelectedCardDataProps) => {
  return (
    <div
      className={`p-4 rounded-xl flex gap-4 items-start ${
        withShadow ? "shadow-md" : "bg-slate-200"
      }`}
    >
      <CardBtn card={selectedCard.card} onClick={onClick} />
      <div className="flex flex-col gap-2 flex-grow">
        <h4 className="text-lg font-medium flex justify-between items-center">
          <button onClick={() => onClick(selectedCard.card)}>
            {selectedCard.card.name}
          </button>
          {options}
        </h4>
        <div>Level {selectedCard.fromLevel}</div>
        <div>
          Required for level {selectedCard.toLevel}:
          <ul className="list-disc ml-4">
            <li>{getRequiredGold(selectedCard).toLocaleString()} gold</li>
            <li>{getRequiredCards(selectedCard).toLocaleString()} cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
