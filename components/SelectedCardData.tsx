import { SelectedCard } from "../utils/types";
import { CardImg } from "./CardImg";
import { Option, Options } from "./Options";

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
      <div className="flex flex-col gap-2 flex-grow">
        <h4 className="text-lg font-medium flex justify-between items-center">
          {selectedCard.card.name}
          <Options>
            <Option onClick={() => {}}>Edit</Option>
            <Option onClick={() => {}}>Remove</Option>
          </Options>
        </h4>
        <div>Level {selectedCard.fromLevel}</div>
        <div>
          Required for level {selectedCard.toLevel}:
          <ul className="list-disc ml-4">
            <li>{selectedCard.goldRequired.toLocaleString()} gold</li>
            <li>{selectedCard.cardsRequired.toLocaleString()} cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
