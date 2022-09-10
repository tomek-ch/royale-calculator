import { useTransition } from "../hooks/useTransition";
import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { SelectedCardsList } from "./SelectedCardsList";
import { UpgradeSummary } from "./UpgradeSummary";
import { DeckTabs } from "./DeckTabs";
import { useMyContext } from "../context/MyContext";
import { CardsModal } from "./CardsModal";

export const SelectedCards = () => {
  const {
    selectedCard: { editSelectedCard, addSelectedCard, resetCard },
  } = useMyContext();

  const modal = useTransition({ onClose: resetCard });

  const handleEdit = (newData: SelectedCard) => {
    editSelectedCard(newData);
    modal.toggle();
  };

  const handleAddToDeck = () => {
    addSelectedCard();
    modal.toggle();
  };

  return (
    <>
      <DeckTabs />
      <SelectedCardsList edit={handleEdit} />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <UpgradeSummary />
      <CardsModal transition={modal} onAdd={handleAddToDeck} />
    </>
  );
};
