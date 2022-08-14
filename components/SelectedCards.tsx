import { Button } from "./Button";
import { SelectedCardsList } from "./SelectedCardsList";

export const SelectedCards = () => {
  return (
    <>
      <h2 className="mt-5 mb-3">Selected cards</h2>
      <SelectedCardsList />
      <Button variant="primary" className="mt-2 ml-auto">
        Add a card
      </Button>
    </>
  );
};
