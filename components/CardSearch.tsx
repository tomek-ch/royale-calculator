import { useInput } from "../hooks/useInput";
import { Card } from "../utils/types";
import { CardThumbnail } from "./CardThumbnail";
import { Input } from "./Input";

interface CardSearchProps {
  cards: Card[];
}

export const CardSearch = ({ cards }: CardSearchProps) => {
  const { input, handleChange } = useInput();
  return (
    <>
      <Input
        value={input}
        onChange={handleChange}
        placeholder="Search for cards"
        autoFocus
      />
      <div className="grid grid-cols-4 gap-2 mt-4 overflow-y-scroll h-[calc(100%-124px)] pr-2">
        {cards.map((card) => (
          <CardThumbnail key={card.id} card={card} onClick={() => {}} />
        ))}
      </div>
    </>
  );
};
