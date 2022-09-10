import { useEffect, useRef, useState } from "react";
import { useMyContext } from "../context/MyContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { useSync } from "../hooks/useSync";
import { useTransition } from "../hooks/useTransition";
import { getRange } from "../utils/range";
import { SelectedCard } from "../utils/types";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { CardsEditBar } from "./CardsEditBar";
import { EditBar } from "./EditBar";
import { Modal } from "./Modal";
import { Option, Options } from "./Options";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { SelectedCardData } from "./SelectedCardData";

interface SelectedCardsListProps {
  edit: (selectedCard: SelectedCard) => void;
}

export const SelectedCardsList = ({ edit }: SelectedCardsListProps) => {
  const {
    decks: { deck: cards },
    selectedCard: { remove },
    bulkEdit: {
      selectForEdit,
      selectAll,
      cancelSelect,
      deleteMany,
      selectedFromLevel,
      selectedToLevel,
      updateManyFrom,
      updateManyTo,
      maxStartLevel,
      isSelectMode,
      numberOfSelected,
    },
  } = useMyContext();
  const cardTiles = useRef<(HTMLDivElement | null)[]>([]);

  const editBar = useTransition();
  const editBarRef = useRef<HTMLDivElement | null>(null);

  const [inputFrom, setInputFrom] = useState(selectedFromLevel);
  const [inputTo, setInputTo] = useState(selectedToLevel);

  const updateManyModal = useTransition({
    onClose: () => {
      setInputFrom(null);
      setInputTo(null);
    },
    onOpen: () => {
      setInputFrom(selectedFromLevel);
      setInputTo(selectedToLevel);
    },
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
                onClick={() => edit(selectedCard)}
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
        <Modal
          {...updateManyModal}
          title={`Editing ${numberOfSelected} ${
            numberOfSelected > 1 ? "items" : "item"
          }`}
        >
          Upgrade cards from level
          <Select
            selected={inputFrom}
            onChange={setInputFrom}
            className="w-20 mt-2 mb-4 z-10"
          >
            <SelectBtn>{inputFrom || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                getRange(maxStartLevel, 14).map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          Upgrade cards to level
          <Select
            selected={inputTo}
            onChange={setInputTo}
            className="w-20 mt-2"
          >
            <SelectBtn>{inputTo || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                getRange(maxStartLevel, 14).map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                updateManyModal.toggle();
                cancelSelect();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (inputFrom) {
                  updateManyFrom(inputFrom);
                }
                if (inputTo) {
                  updateManyTo(inputTo);
                }
                updateManyModal.toggle();
                cancelSelect();
              }}
            >
              Save
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};
