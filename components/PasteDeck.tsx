import { useMyContext } from "../context/MyContext";
import { Deck } from "./Deck";

interface PasteDeckProps {}

export const PasteDeck = ({}: PasteDeckProps) => {
  const {
    player: { copiedDeck },
  } = useMyContext();
  return (
    <>
      <Deck cards={copiedDeck || []} />
    </>
  );
};
