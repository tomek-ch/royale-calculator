import { useInput } from "../hooks/useInput";
import { Card } from "../utils/types";
import { CardBtn } from "./CardBtn";
import { Input } from "./Input";

interface CardSearchProps {
  cards: Card[];
  onCardSelect: (card: Card, fromLevel: number, toLevel: number) => void;
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
              <CardBtn
                key={card.id}
                card={card}
                onClick={() => onCardSelect(card, card.startingLevel, 14)}
              />
            );
          }
          return [];
        })}
      </div>
    </>
  );
};
