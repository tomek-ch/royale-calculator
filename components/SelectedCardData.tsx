import { SelectedCard } from "../utils/types";
import { CardImg } from "./CardImg";

interface SelectedCardDataProps {
  selectedCard: SelectedCard;
}

export const SelectedCardData = ({ selectedCard }: SelectedCardDataProps) => {
  return (
    <div className="p-3 rounded-xl bg-slate-200 flex gap-3 items-start">
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
