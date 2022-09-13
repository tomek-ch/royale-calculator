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
    decks: { currentTab, setCurrentTab },
    bulkEdit: { cancelSelect },
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

  const handleTabChange = (newTab: number) => {
    cancelSelect();
    setCurrentTab(newTab);
  };

  return (
    <>
      <DeckTabs onChange={handleTabChange} activeTab={currentTab} />
      <SelectedCardsList edit={handleEdit} />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <UpgradeSummary />
      <CardsModal transition={modal} onAdd={handleAddToDeck} />
    </>
  );
};
