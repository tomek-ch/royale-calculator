import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { Card } from "./Card";

export const SelectedCardsList = () => {
  const cards: SelectedCard[] = [];

  if (!cards.length) {
    return <Alert>No cards selected</Alert>;
  }

  return (
    <>
      {cards.map((selectCard) => (
        <Card key={selectCard.card.id} />
      ))}
    </>
  );
};
