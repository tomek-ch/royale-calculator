import { Card } from "../utils/types";
import { CardImg } from "./CardImg";

interface CardBtnProps {
  card: Card;
  onClick: (card: Card) => void;
}

export const CardBtn = ({ card, onClick }: CardBtnProps) => {
  return (
    <button
      className="active:scale-95 transition-all"
      onClick={() => onClick(card)}
    >
      <CardImg card={card} />
    </button>
  );
};
