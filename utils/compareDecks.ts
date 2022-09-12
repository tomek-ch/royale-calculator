import { Card } from "./types";

export const areDecksTheSame = (deck1: Card[], deck2: Card[]) => {
  return deck1.every(({ id }) => deck2.some((card) => card.id === id));
};
