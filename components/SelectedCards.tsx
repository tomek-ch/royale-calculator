import { useTransition } from "../hooks/useTransition";
import { SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { ArrowLeft } from "./icons/ArrowLeft";
import { SelectedCardsList } from "./SelectedCardsList";
import { UpgradeSummary } from "./UpgradeSummary";
import { DeckTabs } from "./DeckTabs";
import { useMyContext } from "../context/MyContext";

export const SelectedCards = () => {
  const {
    selectedCard: {
      editSelectedCard,
      addSelectedCard,
      isEditing,
      resetCard,
      selectCard,
      selectedCard,
      setFromLevel,
      setToLevel,
    },
  } = useMyContext();

  const modal = useTransition({ onClose: resetCard });
  const modalTitle = isEditing ? "Editing card" : "Add a card";

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
      <Modal
        {...modal}
        type="drawer"
        title={
          selectedCard ? (
            <div className="mb-3 flex gap-2">
              <button onClick={resetCard}>
                <ArrowLeft width={16} />
              </button>
              {modalTitle}
            </div>
          ) : (
            modalTitle
          )
        }
      >
        {selectedCard ? (
          <CardUpgradeForm
            selectedCard={selectedCard}
            addToDeck={handleAddToDeck}
            goBack={resetCard}
            setFromLevel={setFromLevel}
            setToLevel={setToLevel}
            isEditing={isEditing}
          />
        ) : (
          <CardSearch onCardSelect={selectCard} />
        )}
      </Modal>
    </>
  );
};
