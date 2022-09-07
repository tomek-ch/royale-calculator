import { useTransition } from "../hooks/useTransition";
import { Card, SelectedCard } from "../utils/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { ArrowLeft } from "./icons/ArrowLeft";
import { useDecks } from "../hooks/useDecks";
import { useSelectedCard } from "../hooks/useSelectedCard";
import { useBulkEdit } from "../hooks/useBulkEdit";
import { SelectedCardsList } from "./SelectedCardsList";
import { Tabs } from "./Tabs";
import { UpgradeSummary } from "./UpgradeSummary";

interface SelectedCardsProps {
  cards: Card[];
}

export const SelectedCards = ({ cards }: SelectedCardsProps) => {
  const { currentTab, deck, setCurrentTab, setDeck, decks } = useDecks();

  const {
    addSelectedCard,
    editSelectedCard,
    isEditing,
    resetCard,
    selectCard,
    selectedCard,
    remove,
    setFromLevel,
    setToLevel,
  } = useSelectedCard(deck, setDeck);

  const {
    cancelSelect,
    deleteMany,
    maxStartLevel,
    selectAll,
    selectForEdit,
    selectedFromLevel,
    selectedToLevel,
    updateManyFrom,
    updateManyTo,
    isSelectMode,
    numberOfSelected,
  } = useBulkEdit(deck, setDeck);

  const modal = useTransition({ onClose: resetCard });
  const modalTitle = isEditing ? "Editing card" : "Add a card";

  const handleTabChange = (newTab: number) => {
    cancelSelect();
    setCurrentTab(newTab);
  };

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
      <Tabs
        tabs={decks.map((_, idx) => {
          if (idx === currentTab) {
            return `Deck ${idx + 1}`;
          }
          return (idx + 1).toString();
        })}
        onChange={handleTabChange}
        activeTab={currentTab}
      />
      <SelectedCardsList
        cards={deck}
        remove={remove}
        edit={handleEdit}
        selectForEdit={selectForEdit}
        cancelSelect={cancelSelect}
        selectAll={selectAll}
        deleteMany={deleteMany}
        selectedFromLevel={selectedFromLevel}
        selectedToLevel={selectedToLevel}
        updateManyFrom={updateManyFrom}
        updateManyTo={updateManyTo}
        maxStartLevel={maxStartLevel}
        isSelectMode={isSelectMode}
        numberOfSelected={numberOfSelected}
      />
      <Button variant="primary" className="mt-3 ml-auto" onClick={modal.toggle}>
        Add a card
      </Button>
      <UpgradeSummary selectedCards={deck} />
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
          <CardSearch cards={cards} onCardSelect={selectCard} />
        )}
      </Modal>
    </>
  );
};
