import { useMyContext } from "../context/MyContext";
import { useInput } from "../hooks/useInput";
import { CardBtn } from "./CardBtn";
import { Input } from "./Input";

export const CardSearch = () => {
  const [input, handleChange] = useInput();
  const {
    cards,
    selectedCard: { selectCard },
  } = useMyContext();
  return (
    <>
      <Input
        value={input}
        onChange={handleChange}
        placeholder="Search for cards"
        autoFocus
      />
      <div className="grid gap-2 grid-cols-4 xs:grid-cols-fill auto-rows-min mt-4 overflow-y-scroll h-[calc(100%-124px)] pr-2">
        {cards.flatMap((card) => {
          if (
            !input ||
            card.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
          ) {
            return <CardBtn key={card.id} card={card} onClick={selectCard} />;
          }
          return [];
        })}
      </div>
    </>
  );
};
