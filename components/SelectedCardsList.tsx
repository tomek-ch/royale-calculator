import { Alert } from "./Alert";
import { Card } from "./Card";

interface SelectedCard {}

export const SelectedCardsList = () => {
  const cards: SelectedCard[] = [];

  if (!cards.length) {
    return <Alert>No cards selected</Alert>;
  }

  return (
    <>
      {cards.map(() => (
        <Card />
      ))}
    </>
  );
};
