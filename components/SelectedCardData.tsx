import { ReactNode } from "react";
import { useMyContext } from "../context/MyContext";
import { getRequiredCards, getRequiredGold } from "../utils/getRequired";
import { Card, SelectedCard } from "../utils/types";
import { InlineAlert } from "./InlineAlert";
import { CardBtn } from "./CardBtn";
import { Tooltip } from "./Tooltip";

interface SelectedCardDataProps {
  selectedCard: SelectedCard;
  withShadow?: boolean;
  options?: ReactNode;
  onClick: (card: Card) => void;
  onSelect?: () => void;
  selected?: boolean;
  className?: string;
}

interface CardCountAlertProps {
  selectedCard: SelectedCard;
  requiredCardCount: number;
}

const CardCountAlert = ({
  selectedCard,
  requiredCardCount,
}: CardCountAlertProps) => {
  const {
    player: { player, playerCards },
  } = useMyContext();

  if (!player) {
    return null;
  }
  const playerCard = playerCards.find(({ id }) => id === selectedCard.card.id);
  if (!playerCard) {
    return <InlineAlert variant="danger">Card not unlocked</InlineAlert>;
  }
  if (selectedCard.fromLevel !== playerCard.level) {
    return (
      <Tooltip
        className="w-60"
        title={`Your ${selectedCard.card.name} is level ${playerCard.level}, but it is set to level ${selectedCard.fromLevel} here`}
      >
        <InlineAlert>Card level is different</InlineAlert>
      </Tooltip>
    );
  }
  const cardCountDifference = requiredCardCount - playerCard.count;
  if (cardCountDifference > 0) {
    return (
      <InlineAlert variant="warning">
        {cardCountDifference.toLocaleString()} cards missing
      </InlineAlert>
    );
  }
  return <InlineAlert variant="success">No missing cards</InlineAlert>;
};

export const SelectedCardData = ({
  selectedCard,
  withShadow = true,
  options,
  onClick,
  onSelect,
  selected,
  className = "",
}: SelectedCardDataProps) => {
  const requiredCardCount = getRequiredCards(selectedCard);
  return (
    <div
      className={`p-4 rounded-xl flex gap-4 items-start
      dark:bg-slate-800
      ${className} ${withShadow ? "shadow-md" : "bg-slate-200"} ${
        onSelect ? "outline outline-2 transition-all" : ""
      } ${selected ? "outline-blue-500" : "outline-transparent"}`}
      onClick={(e) => {
        if (
          e.target instanceof HTMLButtonElement ||
          e.target instanceof SVGElement ||
          e.target instanceof HTMLImageElement
        ) {
          return;
        }
        onSelect?.();
      }}
    >
      <CardBtn card={selectedCard.card} onClick={onClick} />
      <div className="flex flex-col gap-2 flex-grow">
        <h4 className="text-lg font-medium flex justify-between items-center dark:text-slate-300">
          <button onClick={() => onClick(selectedCard.card)}>
            {selectedCard.card.name}
          </button>
          {options}
        </h4>
        <div>Level {selectedCard.fromLevel}</div>
        <div>
          Required for level {selectedCard.toLevel}:
          <ul className="list-disc ml-4">
            <li>
              <span className="font-medium">
                {getRequiredGold(selectedCard).toLocaleString()}
              </span>{" "}
              gold
            </li>
            <li>
              <span className="font-medium">
                {requiredCardCount.toLocaleString()}
              </span>{" "}
              cards
            </li>
          </ul>
        </div>
        <CardCountAlert
          requiredCardCount={requiredCardCount}
          selectedCard={selectedCard}
        />
      </div>
    </div>
  );
};
