import { useModal } from "../hooks/useModal";
import { Card } from "../utils/types";
import { Button } from "./Button";
import { CardSearch } from "./CardSearch";
import { Modal } from "./Modal";
import { SelectedCardsList } from "./SelectedCardsList";

interface SelectedCardsProps {
  cards: Card[];
}

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const modal = useModal();
  return (
    <>
      <h2 className="mt-5 mb-3">Selected cards</h2>
      <SelectedCardsList />
      <Button variant="primary" className="mt-2 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <Modal {...modal} type="drawer" title="Add a card">
        <CardSearch cards={cards} />
      </Modal>
    </>
  );
};
