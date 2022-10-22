import { useRef } from "react";
import { useMyContext } from "../context/MyContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { useSync } from "../hooks/useSync";
import { useTransition } from "../hooks/useTransition";
import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { CardsEditBar } from "./CardsEditBar";
import { Option, Options } from "./Options";
import { SelectedCardData } from "./SelectedCardData";
import { UpdateManyModal } from "./UpdateManyModal";

interface SelectedCardsListProps {
  edit: (selectedCard: SelectedCard) => void;
}

export const SelectedCardsList = ({ edit }: SelectedCardsListProps) => {
  const {
    decks: { deck: cards },
    selectedCard: { remove },
    bulkEdit: { selectForEdit, cancelSelect, isSelectMode, initModal },
  } = useMyContext();
  const cardTiles = useRef<(HTMLDivElement | null)[]>([]);

  const editBar = useTransition();
  const editBarRef = useRef<HTMLDivElement | null>(null);

  const updateManyModal = useTransition({
    onOpen: initModal,
  });
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(
    [cardTiles, editBarRef, modalRef],
    cancelSelect,
    isSelectMode
  );

  useSync(isSelectMode, editBar.set);

  return (
    <>
      {cards.length ? (
        <div className="flex flex-col gap-4 sm:grid grid-cols-2 lg:grid-cols-3">
          {cards.map((selectedCard, idx) => (
            <div
              key={selectedCard.card.id}
              ref={(el) => (cardTiles.current[idx] = el)}
            >
              <SelectedCardData
                onClick={() => {
                  edit(selectedCard);
                  cancelSelect();
                }}
                selectedCard={selectedCard}
                options={
                  <Options>
                    <Option onClick={() => edit(selectedCard)}>Edit</Option>
                    <Option onClick={() => remove(selectedCard)}>Remove</Option>
                  </Options>
                }
                onSelect={() => selectForEdit(selectedCard.card.id)}
                selected={selectedCard.isSelected}
              />
            </div>
          ))}
        </div>
      ) : (
        <Alert>No cards selected</Alert>
      )}
      <div ref={editBarRef}>
        <CardsEditBar transition={editBar} onEdit={updateManyModal.toggle} />
      </div>
      <div ref={modalRef}>
        <UpdateManyModal transition={updateManyModal} />
      </div>
    </>
  );
};
