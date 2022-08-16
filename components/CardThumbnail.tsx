import { useState } from "react";
import { Card } from "../utils/types";

interface CardThumbnailProps {
  card: Card;
  onClick: (card: Card) => void;
}

export const CardThumbnail = ({ card, onClick }: CardThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <button
      className="active:scale-95 transition-all"
      onClick={() => onClick(card)}
    >
      <img
        src={card.icon}
        alt={card.name}
        width="90.25"
        height="107.52"
        className={isLoading ? "bg-slate-200 rounded-lg" : ""}
        onLoad={() => setIsLoading(false)}
      />
    </button>
  );
};
