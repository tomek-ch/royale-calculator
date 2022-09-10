import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { CardSearch } from "./CardSearch";
import { CardUpgradeForm } from "./CardUpgradeForm";
import { ArrowLeft } from "./icons/ArrowLeft";
import { Modal } from "./Modal";

interface CardsModalProps {
  transition: Transition;
  onAdd: () => void;
}

export const CardsModal = ({ transition, onAdd }: CardsModalProps) => {
  const {
    selectedCard: { selectedCard, resetCard, isEditing },
  } = useMyContext();

  const modalTitle = isEditing ? "Editing card" : "Add a card";

  return (
    <Modal
      {...transition}
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
      {selectedCard ? <CardUpgradeForm addToDeck={onAdd} /> : <CardSearch />}
    </Modal>
  );
};
