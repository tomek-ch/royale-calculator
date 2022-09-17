import { Card } from "../utils/types";
import { useState } from "react";

interface CardImgProps {
  card: Card;
  className?: string;
}

export const CardImg = ({ card }: CardImgProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <img
      src={card.icon}
      alt={card.name}
      width="90.25"
      height="107.52"
      className={isLoading ? "bg-slate-200 dark:bg-slate-700 rounded-lg" : ""}
      onLoad={() => setIsLoading(false)}
    />
  );
};
