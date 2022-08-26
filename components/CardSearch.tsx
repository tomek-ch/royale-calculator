import { useInput } from "../hooks/useInput";
import { Card } from "../utils/types";
import { CardThumbnail } from "./CardThumbnail";
import { Input } from "./Input";

interface CardSearchProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
}

export const CardSearch = ({ cards, onCardSelect }: CardSearchProps) => {
  const { input, handleChange } = useInput();
  return (
    <>
      <Input
        value={input}
        onChange={handleChange}
        placeholder="Search for cards"
        autoFocus
      />
      <div className="grid gap-2 grid-cols-fill auto-rows-min mt-4 overflow-y-scroll h-[calc(100%-124px)] pr-2">
        {cards.flatMap((card) => {
          if (
            !input ||
            card.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
          ) {
            return (
              <CardThumbnail
                key={card.id}
                card={card}
                onClick={() => onCardSelect(card)}
              />
            );
          }
          return [];
        })}
      </div>
    </>
  );
};
