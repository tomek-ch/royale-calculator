import { Card } from "../utils/types";
import { Button } from "./Button";
import { CardImg } from "./CardImg";
import { Copy } from "./icons/Copy";

interface DeckProps {
  cards: Card[];
  onCopy?: () => void;
  className?: string;
}

export const Deck = ({ cards, onCopy, className = "" }: DeckProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {cards.map((card) => (
          <CardImg key={card.id} card={card} />
        ))}
      </div>
      {onCopy ? (
        <Button
          className="flex gap-2 ml-auto mt-4"
          variant="primary"
          onClick={onCopy}
        >
          <Copy width="20" className="-ml-1" />
          Copy
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
