import { SelectedCard } from "../utils/types";
import { CardImg } from "./CardImg";

interface SelectedCardDataProps {
  selectedCard: SelectedCard;
  withShadow?: boolean;
}

export const SelectedCardData = ({
  selectedCard,
  withShadow = true,
}: SelectedCardDataProps) => {
  return (
    <div
      className={`p-4 rounded-xl flex gap-4 items-start ${
        withShadow ? "shadow-md" : "bg-slate-200"
      }`}
    >
      <CardImg card={selectedCard.card} />
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-medium">{selectedCard.card.name}</h4>
        <div>Level {selectedCard.fromLevel}</div>
        <div>
          Required for level {selectedCard.toLevel}:
          <ul className="list-disc ml-4">
            <li>100 gold</li>
            <li>100 cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
